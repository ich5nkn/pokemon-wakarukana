import { POKEMONS } from "@/constants/pokemons";
import { VERSIONS } from "@/constants/version";

type SelectVersions = Array<(typeof VERSIONS)[number]["id"]>;

export type Pokemon = (typeof POKEMONS)[number];

export type Answer = Pick<Pokemon, "name" | "name2">;

export type Selector = [Answer, Answer, Answer, Answer];

export type OptionsType = {
  numberOfQuiz: number;
  isChoice: boolean;
  showHint: boolean;
  isSilhouette: boolean;
  hasRegion: boolean;
  hasAnotherForm: boolean;
  hasMega: boolean;
  hasGigantic: boolean;
  versions: SettingOptions;
};

export type SettingOptions = {
  readonly id: number;
  value: boolean;
}[];
