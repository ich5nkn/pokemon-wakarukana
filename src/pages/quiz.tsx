import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Box, Heading } from "@chakra-ui/react";

import { useGlobalState } from "@/hooks/useGlobalState";
import { useShowToast } from "@/hooks/useShowToast";
import { getQuiz } from "@/utils/fetcher";
import { Answer, OptionsType } from "@/types";
import { QuizResponse } from "@/types/http";
import { ChoiceAnswer } from "@/components/pages/quiz/ChoiceAnswer";
import { initialOptions } from "@/constants/options";
import { InputAnswer } from "@/components/pages/quiz/InputAnswer";
import { QuizImage } from "@/components/pages/quiz/QuizImage";
import { Header } from "@/components/pages/quiz/Header";

type QuizData = Pick<QuizResponse, "image" | "selector" | "answerCount">;

const Quiz = () => {
  const router = useRouter();
  const pushToast = useShowToast();
  const { globalState, globalStateDispatch } = useGlobalState();
  const [quizData, setQuizData] = useState<QuizData>({ answerCount: 1 });
  const [loadingImg, setLoadingImg] = useState(false);
  const sendAnswer = (answer: Answer) => fetchQuiz({ answer });

  const fetchQuiz = async ({
    answer,
    overrideOptions,
  }: {
    answer?: Answer;
    overrideOptions?: OptionsType;
  }) => {
    try {
      setLoadingImg(true);
      const res = await getQuiz({
        displayed: globalState.displayed,
        options: overrideOptions || globalState.options || initialOptions,
        answer,
      });
      if (res.isCorrect !== undefined) {
        globalStateDispatch({
          type: res.isCorrect ? "addCorrect" : "addIncorrect",
        });
        pushToast({ isCorrect: res.isCorrect, ...res.answer });
      }
      if (res.finished) {
        router.push("/result");
        return;
      }
      if (!res || !res.no) return;
      setQuizData(res);
      globalStateDispatch({ type: "addDisplayed", value: res.no });
    } catch {
      alert("error");
    }
  };

  useEffect(() => {
    if (!globalState.options) {
      router.push("/select");
      return;
    }
    fetchQuiz({ overrideOptions: globalState.options });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box py={4}>
      <Header fetchQuiz={() => fetchQuiz({})} />
      <Heading mt={4}>このポケモンの名前は？</Heading>
      <QuizImage
        src={quizData.image}
        loadingImg={loadingImg}
        onLoadingComplete={() => setLoadingImg(false)}
      />
      {globalState.options?.isChoice ? (
        <ChoiceAnswer selector={quizData.selector} onSelect={sendAnswer} />
      ) : (
        <InputAnswer inputsCount={quizData.answerCount} onSend={sendAnswer} />
      )}
    </Box>
  );
};

export default Quiz;
