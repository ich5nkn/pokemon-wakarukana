// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizRequestBody, QuizResponse } from "@/types/http";
import { getNextPokemon, getSelector } from "@/utils/api/quiz";

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
  const selector = getSelector(nextPokemon?.no);

  res.status(200).json({
    no: nextPokemon?.no,
    hasSecondName: nextPokemon?.hasSecondName,
    selector: options.isChoice ? selector : undefined,
    finished: !nextPokemon,
  });
}
