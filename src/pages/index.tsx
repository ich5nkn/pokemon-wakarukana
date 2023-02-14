import { useState } from "react";
import Image from "next/image";

export default function Home() {
  const [no, setNo] = useState<string>("1");
  const onClick = async () => {
    const res = await fetch("/api/hello");
    const json = await res.json();
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
