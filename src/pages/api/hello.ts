// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

const data = ["1", "2", "3", "3-1", "3-2"];

type Data = {
  no: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const randomPick = data[Math.floor(Math.random() * data.length)];
  res.status(200).json({ no: randomPick });
}
