// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizRequestBody, QuizResponse } from "@/types/http";
import { getNextPokemon, getSelector, judgeAnswer } from "@/utils/api/quiz";

interface QuizRequest extends NextApiRequest {
  body: QuizRequestBody;
}

export default function handler(
  req: QuizRequest,
  res: NextApiResponse<QuizResponse>
) {
  const { displayed, options, answer } = req.body;

  const nextPokemon = getNextPokemon(displayed, options);
  if (options.numberOfQuiz <= displayed.length || !nextPokemon)
    return res.status(200).json({ finished: true });

  const selector = options.isChoice
    ? getSelector(options, nextPokemon?.no)
    : undefined;
  const isCorrect = answer
    ? judgeAnswer(displayed[displayed.length - 1], answer.name, answer.name2)
    : undefined;

  res.status(200).json({
    no: nextPokemon?.no,
    hasSecondName: nextPokemon?.hasSecondName,
    selector,
    isCorrect,
    finished: false,
  });
}
