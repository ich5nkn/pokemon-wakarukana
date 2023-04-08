// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizRequestBody, QuizResponse } from "@/types/http";
import { getNextPokemon, getSelector } from "@/utils/api/quiz";
import { Selector } from "@/types";

interface QuizRequest extends NextApiRequest {
  body: QuizRequestBody;
}

export default function handler(
  req: QuizRequest,
  res: NextApiResponse<QuizResponse>
) {
  const { answered, options } = req.body;
  if (options.numberOfQuiz <= answered.length)
    return res.status(200).json({ finished: true });
  const nextPokemon = getNextPokemon(answered, options);
  // TODO: 4択の選択肢を表示する
  // 最初の１文字がマッチしているポケモン or 文字の近似値が近いポケモン を持ってこれるとなお良い
  const selector = getSelector(nextPokemon?.no);

  res.status(200).json({
    no: nextPokemon?.no,
    hasSecondName: nextPokemon?.hasSecondName,
    selector: options.isChoice ? selector : undefined,
    finished: !nextPokemon,
  });
}
