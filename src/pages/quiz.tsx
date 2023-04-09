import { useEffect, useReducer, useState } from "react";
import Image from "next/image";
import { getQuiz } from "@/utils/fetcher";
import { Answer, OptionsType, Selector } from "@/types";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { queryToOptions } from "@/utils/query";
import { ChoiceAnswer } from "@/components/pages/quiz/ChoiceAnswer";
import { initialOptions } from "@/constants/options";
import { ProgressBar } from "@/components/pages/quiz/ProgressBar";

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

const Quiz = () => {
  const router = useRouter();
  const [options, setOptions] = useState<OptionsType>(initialOptions);
  const [no, setNo] = useState<string | undefined>();
  const [displayed, setDisplayed] = useState<string[]>([]);
  const [selector, setSelector] = useState<Selector | undefined>();
  const [finished, setFinished] = useState<boolean>(false);
  const [answered, dispatchAnswered] = useReducer(answeredReducer, {
    correct: 0,
    incorrect: 0,
  });
  const onSelect = async (answer: Answer) => {
    fetchQuiz({ answer });
  };

  // 初回起動時に実行
  useEffect(() => {
    if (!router.isReady) return;
    try {
      const options = queryToOptions(router.query);
      setOptions(options);
      fetchQuiz({ overrideOptions: options });
    } catch {
      router.push("/select");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const fetchQuiz = async ({
    answer,
    overrideOptions,
  }: {
    answer?: Answer;
    overrideOptions?: OptionsType;
  }) => {
    try {
      const res = await getQuiz({
        displayed,
        options: overrideOptions || options,
        answer,
      });
      if (res.finished) return setFinished(res.finished);
      if (!res || !res.no) return;
      // TODO: 回答を受け取ったら、Answered に追加する
      // いまは、問題を受け取ったら Answered に追加している
      setNo(res.no);
      if (res.isCorrect !== undefined) {
        dispatchAnswered(res.isCorrect ? "correct" : "incorrect");
      }
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
            total={options.numberOfQuiz}
            primary={answered.correct}
            danger={answered.incorrect}
          />
          <Heading mt={4}>このポケモンの名前は？</Heading>
          <Box mx={"auto"} maxW="75%" my={4}>
            <Image
              src={`/image/pokemon/${no}.png`}
              alt="pokemon image"
              width={1000}
              height={1000}
            />
          </Box>
          {options.isChoice}
          <ChoiceAnswer selector={selector} onSelect={onSelect} />
        </>
      )}
    </Box>
  );
};

export default Quiz;
