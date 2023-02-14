// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { randomPick } from "@/utils/api";

const data = ["1", "2", "3", "3-1", "3-2"];

type Data = {
  no: string | null;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const answered = String(req.query?.answered || "").split(",");
  const unansweredData = data.filter(
    (no) => !answered.some((answered) => answered === no)
  );
  const no = randomPick(unansweredData);
  res.status(200).json({ no });
}
