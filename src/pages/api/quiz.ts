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
  const { answered, options, answer } = req.body;

  const nextPokemon = getNextPokemon(answered, options);
  if (options.numberOfQuiz <= answered.length || !nextPokemon)
    return res.status(200).json({ finished: true });

  const selector = options.isChoice ? getSelector(nextPokemon?.no) : undefined;
  const isCorrect = answer
    ? judgeAnswer(answered[answered.length - 1], answer.name, answer.name2)
    : undefined;

  res.status(200).json({
    no: nextPokemon?.no,
    hasSecondName: nextPokemon?.hasSecondName,
    selector,
    isCorrect,
    finished: false,
  });
}
