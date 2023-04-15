import fs from "fs";
import { base64Image } from ".";

export const readFileSyncSafe = (filepath: string): base64Image | undefined => {
  if (fs.existsSync(filepath)) {
    return fs.readFileSync(filepath).toString("base64");
  }
  return undefined;
};
