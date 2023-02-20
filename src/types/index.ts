import { POKEMONS } from "@/constants/pokemons";
import { VERSIONS } from "@/constants/version";

type SelectVersions = Array<(typeof VERSIONS)[number]["id"]>;

type Pokemon = (typeof POKEMONS)[number];

export type Selector = [
  Pokemon["name"],
  Pokemon["name"],
  Pokemon["name"],
  Pokemon["name"]
];

export type QuizOption = {
  isSelectableQuiz: boolean;
  maxCount: number;
  selectVersions: SelectVersions;
};
