import { Pokemon, Selector, OptionsType, Answer } from ".";

export type QuizRequestBody = {
  displayed: Pokemon["no"][];
  answer?: Answer;
  options: OptionsType;
};

export type QuizResponse = {
  finished: boolean;
  isCorrect?: boolean;
  no?: string;
  hasSecondName?: boolean;
  selector?: Selector;
  answer?: Answer;
};
