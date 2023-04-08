import { POKEMONS } from "@/constants/pokemons";
import { VERSIONS } from "@/constants/version";

type SelectVersions = Array<(typeof VERSIONS)[number]["id"]>;

export type Pokemon = (typeof POKEMONS)[number];

export type Answer = Pick<Pokemon, "name" | "name2">;

export type Selector = [Answer, Answer, Answer, Answer];

export type QuizOption = {
  isSelectableQuiz: boolean;
  maxCount: number;
  selectVersions: SelectVersions;
};

export type SettingOptions = {
  readonly id: number;
  value: boolean;
}[];
