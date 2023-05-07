import fetch from "node-fetch";

import type { NextApiRequest, NextApiResponse } from "next";
import { QuizRequestBody, QuizResponse } from "@/types/http";
import { Answer, Pokemon } from "@/types";
import { POKEMONS } from "@/constants/pokemons";
import { toKana } from "@/utils";

interface QuizRequest extends NextApiRequest {
  body: QuizRequestBody;
}

export default async function handler(
  req: QuizRequest,
  res: NextApiResponse<QuizResponse>
) {
  const { displayed, options, answer } = req.body;
  const prevPokemonNo = displayed[displayed.length - 1];

  let isCorrect: boolean | undefined;
  let correctAnswer: Answer | undefined;

  let pickPokemon: Pokemon = { no: "1", name: "フシギダネ", version: 1 };
  let pickPokemonCount: number = 0;

  let pickPokemons: Pokemon[] = [];
  let pickPokemonsCount: number = 0;

  POKEMONS.forEach((pokemon) => {
    // Options で除外されている pokemon の場合、無視する
    if (
      (!options.hasMega && pokemon.isMega) ||
      (!options.hasGigantic && pokemon.isGigantic) ||
      (!options.hasRegion && pokemon.isRegion) ||
      (!options.hasAnotherForm && pokemon.isAnotherForm) ||
      !options.versions
        .filter(({ value }) => value)
        .some(({ id }) => id === pokemon.version)
    )
      return;

    // 回答の答え合わせ
    if (pokemon.no === prevPokemonNo && answer) {
      isCorrect =
        toKana(pokemon.name) === toKana(answer.name) &&
        toKana(pokemon.name2) === toKana(answer.name2) &&
        toKana(pokemon.name3) === toKana(answer.name3);
      // name2 と name3 は順不同
      if (!isCorrect && pokemon.name3) {
        isCorrect =
          toKana(pokemon.name) === toKana(answer.name) &&
          toKana(pokemon.name2) === toKana(answer.name3) &&
          toKana(pokemon.name3) === toKana(answer.name2);
      }
      // 別解が定義されているとき
      if (!isCorrect && pokemon.anotherAnswer) {
        isCorrect =
          toKana(pokemon.anotherAnswer.name) === toKana(answer.name) &&
          toKana(pokemon.anotherAnswer.name2) === toKana(answer.name2) &&
          toKana(pokemon.anotherAnswer.name3) === toKana(answer.name3);
        // TODO: 別解で順不同の必要が出たら足す
      }
      if (!isCorrect)
        correctAnswer = {
          name: pokemon.name,
          name2: pokemon.name2,
          name3: pokemon.name3,
        };
    }

    // 選択肢のダミーの pokemon をセット
    if (options.isChoice) {
      if (pickPokemonsCount < 4) {
        pickPokemons.push(pokemon);
      } else {
        const randomIndex = Math.floor(Math.random() * (pickPokemonsCount + 1));
        if (randomIndex < 4) pickPokemons[randomIndex] = pokemon;
      }
      pickPokemonsCount++;
    }

    // 回答済みの pokemon を無視する
    if (displayed.includes(pokemon.no)) return;

    // 次の問題をセット
    const randomIndex = Math.floor(Math.random() * (pickPokemonCount + 1));
    if (randomIndex === pickPokemonCount) {
      pickPokemon = pokemon;
    }
    pickPokemonCount++;
  });

  if (options.numberOfQuiz <= displayed.length || pickPokemonCount === 0)
    return res.status(200).json({
      finished: true,
      isCorrect,
      answer: correctAnswer,
      answerCount: 1,
    });

  // 上記の forEach で以下の形になるので、それを加工する
  // pickPokemons = [Pokemon, Pokemon, Pokemon, Pokemon]
  // pickPokemon = Pokemon

  let selector: [Answer, Answer, Answer, Answer] | undefined;

  if (options.isChoice) {
    const duplicateIndex = pickPokemons.findIndex(
      (pokemon) => pokemon === pickPokemon
    );
    if (duplicateIndex === -1) {
      const randomIndex = Math.floor(Math.random() * 4);
      pickPokemons[randomIndex] = pickPokemon;
    } else {
      pickPokemons[duplicateIndex] = pickPokemon;
    }
    selector = pickPokemons.map(({ name, name2, name3 }) => ({
      name,
      name2,
      name3,
    })) as [Answer, Answer, Answer, Answer];
  }

  // 次の問題の画像を取得
  const basePath = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : "http://localhost:3000";
  const filePath = `${basePath}/img/pokemon/${pickPokemon.no}.webp`;
  const imageResponse = await fetch(filePath);
  const imageData = await imageResponse.arrayBuffer();
  const base64Image = Buffer.from(imageData).toString("base64");
  const image = base64Image
    ? `data:image/png;base64,${base64Image}`
    : undefined;

  // 回答の入力欄を算出
  const answerCount = pickPokemon.name3 ? 3 : pickPokemon.name2 ? 2 : 1;

  // ヒントを取得
  const getHint = (name: string): string => {
    const length = name.length;
    const randomIndex = Math.floor(Math.random() * length);
    return Array.from(name)
      .map((char, index) => (index === randomIndex ? char : "〇"))
      .join("");
  };
  const hint =
    options.showHint && !options.isChoice
      ? getHint(pickPokemon.name)
      : undefined;

  res.status(200).json({
    no: pickPokemon.no,
    image,
    answerCount,
    selector,
    isCorrect,
    finished: false,
    answer: correctAnswer,
    hint,
  });
}
