// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { randomPick } from "@/utils/api";
import { QuizRequestBody, QuizResponse } from "@/types/http";

const data = ["1", "2", "3", "3-1", "3-2"];

interface QuizRequest extends NextApiRequest {
  body: QuizRequestBody;
}

export default function handler(
  req: QuizRequest,
  res: NextApiResponse<QuizResponse>
) {
  const { answered } = req.body;
  const unansweredData = data.filter(
    (no) => !answered.some((answered) => answered === no)
  );
  const no = randomPick(unansweredData);
  res.status(200).json({ no });
}
