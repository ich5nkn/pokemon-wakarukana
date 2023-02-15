import { VERSIONS } from "@/constants/version";

type SelectVersions = Array<(typeof VERSIONS)[number]["id"]>;

export type QuizOption = {
  isSelectableQuiz: boolean;
  selectVersions: SelectVersions;
};
