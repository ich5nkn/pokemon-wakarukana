import { POKEMONS } from "@/constants/pokemons";
import { FixedLengthArray } from "./utils";
import { BallType } from "@/constants/balls";

export type Pokemon = (typeof POKEMONS)[number];

export type Answer = Pick<Pokemon, "name" | "name2">;

export type Selector = FixedLengthArray<Answer, 4>;

export type OptionsType = {
  selectedOptionType?: BallType;
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
