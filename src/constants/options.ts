import { OptionsType } from "@/types";
import { VERSIONS } from "./version";

export const initialOptions: OptionsType = {
  numberOfQuiz: 10,
  isChoice: false,
  showHint: false,
  isSilhouette: false,
  hasRegion: true,
  hasAnotherForm: true,
  hasMega: true,
  hasGigantic: true,
  versions: VERSIONS.map(({ id }) => ({ id, value: true })),
};
