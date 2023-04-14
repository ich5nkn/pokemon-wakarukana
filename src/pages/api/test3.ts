import fetch from "node-fetch";

import type { NextApiResponse } from "next";

export default async function handler(_req: undefined, res: NextApiResponse) {
  const imageUrl = `${
    process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"
  }/test/test3.png`;
  const response = await fetch(imageUrl);
  const imageData = await response.arrayBuffer();
  const base64Image = Buffer.from(imageData).toString("base64");
  res.status(200).json({
    image: `data:image/png;base64,${base64Image}`,
  });
}
