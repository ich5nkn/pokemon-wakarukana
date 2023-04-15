import fetch from "node-fetch";

import type { NextApiRequest, NextApiResponse } from "next";
import { QuizRequestBody, QuizResponse } from "@/types/http";
import { Answer, Pokemon } from "@/types";
import { POKEMONS } from "@/constants/pokemons";

interface QuizRequest extends NextApiRequest {
  body: QuizRequestBody;
}

export default async function handler(
  req: QuizRequest,
  res: NextApiResponse<QuizResponse>
) {
  const { displayed, options, answer } = req.body;
  const prevPokemonNo = displayed[displayed.length - 1];

  if (options.numberOfQuiz <= displayed.length)
    return res.status(200).json({ finished: true });

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
        pokemon.name === answer.name && pokemon.name2 === answer.name2;
      if (!isCorrect)
        correctAnswer = { name: pokemon.name, name2: pokemon.name2 };
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

  if (pickPokemonCount === 0) return res.status(200).json({ finished: true });

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
    selector = pickPokemons.map(({ name, name2 }) => ({ name, name2 })) as [
      Answer,
      Answer,
      Answer,
      Answer
    ];
  }

  // 次の問題の画像を取得
  let step = 0;
  try {
    const basePath = process.env.VERCEL_URL || "http://localhost:3000";
    step++;
    const filePath = `${basePath}/img/pokemon/${pickPokemon.no}.webp`;
    step++;
    const imageResponse = await fetch(filePath);
    step++;
    const imageData = await imageResponse.arrayBuffer();
    step++;
    const base64Image = Buffer.from(imageData).toString("base64");
    step++;
    const image = `data:image/png;base64,${base64Image}`;
    step++;

    res.status(200).json({
      no: pickPokemon.no,
      image,
      hasSecondName: !!pickPokemon.name2,
      selector,
      isCorrect,
      finished: false,
      answer: correctAnswer,
    });
  } catch (e) {
    res.status(500).json({
      error: e,
      step,
    } as any);
  }
}
