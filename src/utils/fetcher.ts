import { QuizRequestBody, QuizResponse } from "@/types/http";

const getPostParam = (body: { [k: string]: unknown }) => ({
  method: "POST",
  headers: {
    "Content-Type": "application/json",
  },
  body: JSON.stringify(body),
});

export const getQuiz = async (body: QuizRequestBody): Promise<QuizResponse> => {
  const res = await fetch("/api/quiz", getPostParam(body));
  if (res.status !== 200) throw Error;
  const json = await res.json();
  return json as QuizResponse;
};
