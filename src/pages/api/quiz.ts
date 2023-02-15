// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { QuizRequestBody, QuizResponse } from "@/types/http";
import { getNo } from "@/utils/api/quiz";

interface QuizRequest extends NextApiRequest {
  body: QuizRequestBody;
}

export default function handler(
  req: QuizRequest,
  res: NextApiResponse<QuizResponse>
) {
  const {
    answered,
    option: { maxCount },
  } = req.body;
  if (maxCount === answered.length)
    return res.status(200).json({ finished: true });
  const no = getNo(answered);
  res.status(200).json({ no, finished: !no });
}
