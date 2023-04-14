import type { NextApiResponse } from "next";

export default function handler(_req: undefined, res: NextApiResponse) {
  res.status(200).json({
    no: 1,
  });
}
