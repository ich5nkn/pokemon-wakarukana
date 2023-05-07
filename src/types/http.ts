import { Pokemon, Selector, OptionsType, Answer } from ".";

export type QuizRequestBody = {
  displayed: Pokemon["no"][];
  answer?: Answer;
  options: OptionsType;
};

export type QuizResponse = {
  finished: boolean;
  answerCount: 1 | 2 | 3;
  isCorrect?: boolean;
  no?: string;
  image?: string;
  selector?: Selector;
  answer?: Answer;
  hint?: string;
};
