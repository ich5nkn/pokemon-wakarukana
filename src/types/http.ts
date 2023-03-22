import { QuizOption, Selector } from ".";

export type QuizRequestBody = {
  answered: string[];
  option: QuizOption;
};

export type QuizResponse = {
  no?: string;
  finished: boolean;
  selector?: Selector;
};
