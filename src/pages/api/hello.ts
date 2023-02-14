// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getDecryptedString, getEncryptedString } from "@/utils/api/crypt";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  value: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("query", req.query);
  console.log("body", req.body);
  // const value = getEncryptedString(req.body.value);
  const value = getDecryptedString(req.body.value);

  res.status(200).json({ value });
}
