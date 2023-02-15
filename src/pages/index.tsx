import { useState } from "react";
import Image from "next/image";
import { getQuiz } from "@/utils/fetcher";
import { QuizOption } from "@/types";

export default function Home() {
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

  const commonStyle = { display: "flex", margin: 20 };

  if (finished) return <div style={commonStyle}>Finished!!</div>;

  return (
    <div style={commonStyle}>
      <Image
        src={`/image/pokemon/${no}.png`}
        alt="pokemon image"
        width={100}
        height={100}
      />
      <button style={{ width: 100, height: 100 }} onClick={onClick}>
        Change
      </button>
    </div>
  );
}
