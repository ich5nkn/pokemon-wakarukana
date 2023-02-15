import { useState } from "react";
import Image from "next/image";
import { getQuiz } from "@/utils/fetcher";

export default function Home() {
  const [no, setNo] = useState<string>("1");
  const [answered, setAnswered] = useState<string[]>(["1"]);
  const onClick = async () => {
    try {
      const resNo = (await getQuiz({ answered })).no;
      if (!resNo) return;
      setAnswered((answered) => [...answered, resNo]);
      setNo(resNo);
    } catch {
      alert("error");
    }
  };

  return (
    <div style={{ display: "flex", margin: 20 }}>
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
