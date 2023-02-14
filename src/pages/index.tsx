import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [no, setNo] = useState<string>("1");
  const [answered, setAnswered] = useState<string[]>(["1"]);
  const onClick = async () => {
    const res = await fetch(`/api/quiz?answered=${answered.join(",")}`);
    const json = await res.json();
    if (!json.no) return;
    setAnswered((answered) => [...answered, json.no]);
    setNo(json.no);
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
