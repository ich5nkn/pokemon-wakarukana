import { useEffect, useState } from "react";
import Image from "next/image";
import { getQuiz } from "@/utils/fetcher";
import { QuizOption } from "@/types";
import { Box, Button } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { queryToOptions } from "@/utils/query";
import { OptionsType } from "./select";

const Quiz = () => {
  const router = useRouter();
  const [options, setOptions] = useState<OptionsType | null>(null);
  const [no, setNo] = useState<string>("1");
  const [answered, setAnswered] = useState<string[]>(["1"]);
  const [finished, setFinished] = useState<boolean>(false);
  const onClick = async () => {
    try {
      const dummyOptions: QuizOption = {
        isSelectableQuiz: false,
        maxCount: 3,
        selectVersions: [],
      };
      const res = await getQuiz({ answered, option: dummyOptions });
      if (res.finished) return setFinished(res.finished);
      if (!res.no) return;
      // TODO: 回答のリクエスト送信処理を作成したら、そちらに移動する（現在は無いので、問題を受け取ったら回答したものとしている）
      setAnswered([...answered, res.no]);
      setNo(res.no);
    } catch {
      alert("error");
    }
  };

  useEffect(() => {
    try {
      setOptions(queryToOptions(router.query));
    } catch {
      router.push("/select");
    }
  }, [router]);

  return (
    <Box display={"flex"} m={5}>
      {options?.numberOfQuiz}
      {finished ? (
        "Finished!"
      ) : (
        <>
          <Image
            src={`/image/pokemon/${no}.png`}
            alt="pokemon image"
            width={100}
            height={100}
          />
          <Button onClick={onClick}>Change</Button>
        </>
      )}
    </Box>
  );
};

export default Quiz;
