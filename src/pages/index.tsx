import { useEffect, useState } from "react";
import { Text } from "@chakra-ui/react";
import Image from "next/image";

export default function Home() {
  const [test1, setTest1] = useState<number | undefined>();
  const [test2, setTest2] = useState<string | undefined>();
  const [test3, setTest3] = useState<string | undefined>();
  const fetcher1 = async () => {
    const res = await fetch("/api/test1");
    const json = await res.json();
    setTest1(json.no);
  };
  const fetcher2 = async () => {
    const res = await fetch("/api/test2");
    const json = await res.json();
    setTest2(json.image);
  };
  const fetcher3 = async () => {
    const res = await fetch("/api/test3");
    const json = await res.json();
    setTest3(json.image);
  };

  useEffect(() => {
    console.log("call");
    fetcher1();
    fetcher2();
    fetcher3();
  }, []);

  return (
    <div>
      <div>
        <Text fontSize={"md"} fontWeight={700}>
          APIで filename を返し、public の画像を表示
        </Text>
        {test1 && (
          <Image
            src={`/test/test${test1}.png`}
            alt="pokemon image"
            width={264}
            height={264}
            unoptimized={true}
            loading="eager"
          />
        )}
      </div>
      <div>
        <Text fontSize={"md"} fontWeight={700}>
          fsで画像を読み込み、base64 で返す
        </Text>
        {test2 && (
          <Image
            src={test2}
            alt="pokemon image"
            width={264}
            height={264}
            unoptimized={true}
            loading="eager"
          />
        )}
      </div>
      <div>
        <Text fontSize={"md"} fontWeight={700}>
          node-fetchで画像を読み込み、base64 で返す
        </Text>
        {test3 && (
          <Image
            src={test3}
            alt="pokemon image"
            width={264}
            height={264}
            unoptimized={true}
            loading="eager"
          />
        )}
      </div>
    </div>
  );
}
