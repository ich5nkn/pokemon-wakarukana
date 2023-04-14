import fs from "fs";
import path from "path";
import type { NextApiResponse } from "next";

export default function handler(_req: undefined, res: NextApiResponse) {
  const imagePath = path.join(process.cwd(), "public", "test", "test2.png");
  const imageData = fs.readFileSync(imagePath);
  const base64Image = imageData.toString("base64");
  res.status(200).json({
    image: `data:image/png;base64,${base64Image}`,
  });
}
