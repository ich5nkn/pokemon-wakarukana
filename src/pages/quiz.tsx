import { useEffect, useState } from "react";
import Image from "next/image";
import { getQuiz } from "@/utils/fetcher";
import { Answer, OptionsType, Selector } from "@/types";
import { Box, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { queryToOptions } from "@/utils/query";
import { ChoiceAnswer } from "@/components/pages/quiz/ChoiceAnswer";
import { initialOptions } from "@/constants/options";

const Quiz = () => {
  const router = useRouter();
  const [options, setOptions] = useState<OptionsType>(initialOptions);
  const [no, setNo] = useState<string | undefined>();
  const [answered, setAnswered] = useState<string[]>([]);
  const [selector, setSelector] = useState<Selector | undefined>();
  const [finished, setFinished] = useState<boolean>(false);
  const onSelect = async (answer: Answer) => {
    // TODO: 回答を送信する
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
        answered,
        options: overrideOptions || options,
        answer,
      });
      if (res.finished) return setFinished(res.finished);
      if (!res || !res.no) return;
      // TODO: 回答のリクエスト送信処理を作成したら、そちらに移動する（現在は無いので、問題を受け取ったら回答したものとしている）
      setAnswered([...answered, res.no]);
      // TODO: 選択肢が5個に増える現象が発生したので、デバッグ用に追加。後で消す。
      console.log("res.selector: ", res.selector);
      setSelector(res.selector);
      setNo(res.no);
    } catch {
      alert("error");
    }
  };

  // TODO: 選択肢が5個に増える現象が発生したので、デバッグ用に追加。後で消す。
  useEffect(() => console.log("selector: ", selector), [selector]);

  return (
    <Box py={4}>
      {finished ? (
        "Finished!"
      ) : (
        <>
          {`${answered.length} / ${options.numberOfQuiz || 0}問目`}
          {/* TODO: Progress bar を自作する */}
          {/* 正解数：青、不正回数：赤、残りの問題数：グレー */}
          <Heading mt={2}>このポケモンの名前は？</Heading>
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