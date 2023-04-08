import { useEffect, useState } from "react";
import Image from "next/image";
import { getQuiz } from "@/utils/fetcher";
import { QuizOption, Selector } from "@/types";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { queryToOptions } from "@/utils/query";
import { OptionsType } from "./select";
import { ChoiceAnswer } from "@/components/pages/quiz/ChoiceAnswer";

const Quiz = () => {
  const router = useRouter();
  const [options, setOptions] = useState<OptionsType | undefined>();
  const [no, setNo] = useState<string | undefined>();
  const [answered, setAnswered] = useState<string[]>([]);
  const [selector, setSelector] = useState<Selector>([
    "フシギダネ",
    "フシギソウ",
    "フシギバナ",
    "メガフシギバナ",
  ]);
  const [finished, setFinished] = useState<boolean>(false);
  const onClick = async () => {
    fetchQuiz(options);
  };

  // 初回起動時に実行
  useEffect(() => {
    if (!router.isReady) return;
    try {
      const options = queryToOptions(router.query);
      setOptions(options);
      fetchQuiz(options);
    } catch {
      router.push("/select");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router]);

  const fetchQuiz = async (options?: OptionsType) => {
    try {
      if (!options) return;
      const res = await getQuiz({ answered, options });
      if (res.finished) return setFinished(res.finished);
      if (!res || !res.no || !res.selector) return;
      // TODO: 回答のリクエスト送信処理を作成したら、そちらに移動する（現在は無いので、問題を受け取ったら回答したものとしている）
      setAnswered([...answered, res.no]);
      setSelector(res.selector);
      setNo(res.no);
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
          {`${answered.length} / ${options?.numberOfQuiz || 0}問目`}
          <Heading mt={2}>このポケモンの名前は？</Heading>
          <Box mx={"auto"} maxW="75%" my={4}>
            <Image
              src={`/image/pokemon/${no}.png`}
              alt="pokemon image"
              width={1000}
              height={1000}
            />
          </Box>
          <ChoiceAnswer answers={selector} onSelect={onClick} />
        </>
      )}
    </Box>
  );
};

export default Quiz;
