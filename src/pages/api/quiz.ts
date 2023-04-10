// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizRequestBody, QuizResponse } from "@/types/http";
import { getNextPokemon, getSelector, judgeAnswer } from "@/utils/api/quiz";
import { Answer } from "@/types";
import { POKEMONS } from "@/constants/pokemons";

interface QuizRequest extends NextApiRequest {
  body: QuizRequestBody;
}

export default function handler(
  req: QuizRequest,
  res: NextApiResponse<QuizResponse>
) {
  const { displayed, options, answer } = req.body;

  /**
   * [ 新しい処理の流れ ]
   * 
   * - 共通処理
   *   - POKEMON から option で filter する
   *   - filter された option を 回答済みと未回答で分ける
   * 
   * - 正解・不正解の判定
   *   - 回答済みの最後の pokemon を前回の問題の答えとして、成否判定と回答の返却を行う
   * 
   * - 次の問題作成
   *   - 未回答の pokemon から random で 1つ Pick し、次の問題とする
   *   - isChoice のとき、上記を除外した pokemon から random で 3つ Pick し、ダミーの選択肢とする
   * 
   */



  // POKEMON から options で filter, displayed で filter して random pick
  const nextPokemon = getNextPokemon(displayed, options);
  if (options.numberOfQuiz <= displayed.length || !nextPokemon)
    return res.status(200).json({ finished: true });

  // POKEMON から options ( version 除く ) で filter, 正解と同じ pokemon も filter して random multi pick
  const selector = options.isChoice
    ? getSelector(options, nextPokemon?.no)
    : undefined;

  // POKEMON から target の pokemon を filter して、答え合わせ
  const isCorrect = answer
    ? judgeAnswer(displayed[displayed.length - 1], answer.name, answer.name2)
    : undefined;

  // POKEMON から target の pokemon を filter して、答えを抽出
  const correctAnswer = ((): Answer | undefined => {
    if (!displayed.length || isCorrect) return;
    const targetPokemon = POKEMONS.filter(
      ({ no }) => no === displayed[displayed.length - 1]
    );
    if (!targetPokemon.length) return;
    return targetPokemon[0];
  })();

  res.status(200).json({
    no: nextPokemon?.no,
    hasSecondName: nextPokemon?.hasSecondName,
    selector,
    isCorrect,
    finished: false,
    answer: correctAnswer,
  });
}
