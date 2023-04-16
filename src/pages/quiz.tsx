import { useEffect, useState } from "react";
import Image from "next/image";
import { getQuiz } from "@/utils/fetcher";
import { Answer, OptionsType } from "@/types";
import { Box, Center, Heading, Spinner } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { checkQuery, optionsToQuery, queryToOptions } from "@/utils/query";
import { ChoiceAnswer } from "@/components/pages/quiz/ChoiceAnswer";
import { initialOptions } from "@/constants/options";
import { ProgressBar } from "@/components/pages/quiz/ProgressBar";
import { InputAnswer } from "@/components/pages/quiz/InputAnswer";
import { useGlobalState } from "@/hooks/useGlobalState";
import { QuizResponse } from "@/types/http";
import { useShowToast } from "@/hooks/useShowToast";

type QuizData = Pick<QuizResponse, "image" | "selector" | "hasSecondName">;

const Quiz = () => {
  const router = useRouter();
  const pushToast = useShowToast();
  const { globalState, globalStateDispatch } = useGlobalState();
  const [quizData, setQuizData] = useState<QuizData>({});
  const [loadingImg, setLoadingImg] = useState(false);
  const sendAnswer = (answer: Answer) => fetchQuiz({ answer });

  /**
   * 初回起動時に実行
   *
   * 以下の優先順で option を使用して最初の問題を取得する
   * 1. 正しい Query が設定されていれば、それを使用する
   * 2. Global State を使用する
   * 3. どちらもなければ /select にリダイレクトする
   */
  useEffect(() => {
    if (!router.isReady) return;
    if (checkQuery(router.query)) {
      const options = queryToOptions(router.query);
      globalStateDispatch({ type: "updateOptions", value: options });
      fetchQuiz({ overrideOptions: options });
    } else {
      if (!globalState.options) {
        router.push("/select");
        return;
      }
      fetchQuiz({ overrideOptions: globalState.options });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.isReady]);

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
      if (!res || !res.no) return;
      setQuizData(res);
      globalStateDispatch({ type: "addDisplayed", value: res.no });
    } catch {
      alert("error");
    }
  };

  return (
    <Box py={4}>
      {quizData.finished ? (
        "Finished!"
      ) : (
        <>
      <ProgressBar
        total={globalState.options?.numberOfQuiz || 0}
        primary={globalState.answered.correct}
        danger={globalState.answered.incorrect}
      />
      <Heading mt={4}>このポケモンの名前は？</Heading>
      {quizData.image && (
        <Center mx={"auto"} maxW="75%" my={4} h={264}>
          <Spinner hidden={!loadingImg} size={"xl"} />
          <Image
            src={quizData.image}
            alt="pokemon image"
            width={264}
            height={264}
            unoptimized={true}
            loading="eager"
            onLoadingComplete={() => setLoadingImg(false)}
            hidden={loadingImg}
          />
        </Center>
      )}
      {globalState.options?.isChoice ? (
        <ChoiceAnswer selector={quizData.selector} onSelect={sendAnswer} />
      ) : (
        <InputAnswer
          hasSecondName={!!quizData.hasSecondName}
          onSend={sendAnswer}
        />
          )}
        </>
      )}
      {/* TODO: Share button の sample */}
      <button
        onClick={() =>
          globalState.options &&
          console.log(optionsToQuery(globalState.options))
        }
      >
        share
      </button>
    </Box>
  );
};

export default Quiz;
