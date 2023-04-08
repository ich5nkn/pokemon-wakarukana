import { Pokemon, Selector, OptionsType } from ".";

export type QuizRequestBody = {
  answered: Pokemon["no"][];
  options: OptionsType;
};

export type QuizResponse = {
  finished: boolean;
  isCorrect?: boolean;
  no?: string;
  hasSecondName?: boolean;
  selector?: Selector;
};
