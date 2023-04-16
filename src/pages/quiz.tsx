import { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import { getQuiz } from "@/utils/fetcher";
import { Answer, OptionsType, Selector } from "@/types";
import {
  Box,
  Center,
  Heading,
  Spinner,
  UseToastOptions,
  useToast,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { checkQuery, optionsToQuery, queryToOptions } from "@/utils/query";
import { ChoiceAnswer } from "@/components/pages/quiz/ChoiceAnswer";
import { initialOptions } from "@/constants/options";
import { ProgressBar } from "@/components/pages/quiz/ProgressBar";
import { InputAnswer } from "@/components/pages/quiz/InputAnswer";
import { useGlobalState } from "@/hooks/useGlobalState";

interface Answered {
  correct: number;
  incorrect: number;
}
type AnsweredAction = "correct" | "incorrect";
const answeredReducer = (
  { correct, incorrect }: Answered,
  action: AnsweredAction
) => {
  switch (action) {
    case "correct":
      return { correct: correct + 1, incorrect };
    case "incorrect":
      return { incorrect: incorrect + 1, correct };
    default:
      return { correct, incorrect };
  }
};

const createToast = ({
  isCorrect,
  name,
  name2,
}: {
  isCorrect: boolean;
  name?: string;
  name2?: string;
}): UseToastOptions => ({
  title: isCorrect ? "正解" : "不正解",
  status: isCorrect ? "success" : "error",
  duration: isCorrect ? 2000 : 5000,
  isClosable: true,
  description: isCorrect ? "" : `${name}${name2 ? `（${name2}）` : ""}`,
});

const Quiz = () => {
  const router = useRouter();
  const { globalState, globalStateDispatch } = useGlobalState();
  const [no, setNo] = useState<string | undefined>();
  const [displayed, setDisplayed] = useState<string[]>([]);
  // TODO: この辺り、Response から取得しているのでまとめたい
  const [selector, setSelector] = useState<Selector | undefined>();
  const [hasSecondName, setHasSecondName] = useState(false);
  const [finished, setFinished] = useState<boolean>(false);
  const [loadingImg, setLoadingImg] = useState(false);
  const [answered, dispatchAnswered] = useReducer(answeredReducer, {
    correct: 0,
    incorrect: 0,
  });
  const toast = useToast();
  const sendAnswer = (answer: Answer) => {
    fetchQuiz({ answer });
  };

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
        displayed,
        options: overrideOptions || globalState.options || initialOptions,
        answer,
      });
      if (res.finished) return setFinished(res.finished);
      if (!res || !res.no) return;
      // TODO: 回答を受け取ったら、Answered に追加する
      // いまは、問題を受け取ったら Answered に追加している
      setNo(res.no);
      if (res.isCorrect !== undefined) {
        dispatchAnswered(res.isCorrect ? "correct" : "incorrect");
        toast.closeAll();
        toast(
          createToast({
            isCorrect: res.isCorrect,
            ...res.answer,
          })
        );
      }
      setHasSecondName(!!res.hasSecondName);
      setDisplayed([...displayed, res.no]);
      setSelector(res.selector);
    } catch {
      alert("error");
    }
  };

  return (
    <Box py={4}>
      {finished ? (
        "Finished!"
      ) : (
        <>
          <ProgressBar
            total={globalState.options?.numberOfQuiz || 0}
            primary={answered.correct}
            danger={answered.incorrect}
          />
          <Heading mt={4}>このポケモンの名前は？</Heading>
          {no && (
            <Center mx={"auto"} maxW="75%" my={4} h={264}>
              <Spinner hidden={!loadingImg} size={"xl"} />
              <Image
                src={`/img/pokemon/${no}.webp`}
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
            <ChoiceAnswer selector={selector} onSelect={sendAnswer} />
          ) : (
            <InputAnswer hasSecondName={hasSecondName} onSend={sendAnswer} />
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
