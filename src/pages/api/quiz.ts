// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizRequestBody, QuizResponse } from "@/types/http";
import { getNo } from "@/utils/api/quiz";
import { Selector } from "@/types";

interface QuizRequest extends NextApiRequest {
  body: QuizRequestBody;
}

export default function handler(
  req: QuizRequest,
  res: NextApiResponse<QuizResponse>
) {
  const {
    answered,
    option: { maxCount, isSelectableQuiz },
  } = req.body;
  if (maxCount === answered.length)
    return res.status(200).json({ finished: true });
  const no = getNo(answered);
  const dummySelector = [
    "フシギダネ",
    "フシギソウ",
    "フシギバナ",
    "メガフシギバナ",
  ] as Selector;

  res.status(200).json({
    no,
    selector: isSelectableQuiz ? dummySelector : undefined,
    finished: !no,
  });
}
