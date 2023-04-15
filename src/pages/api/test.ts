import type { NextApiResponse } from "next";

export default function handler(_req: null, res: NextApiResponse) {
  res.status(200).json({
    cwd: process.cwd(),
    public: process.env.NEXT_PUBLIC_BASE_URL,
  });
}
