import { BALLS_CONTENT, BallType } from "@/constants/balls";
import { APP_URL } from "@/constants/url";
import { Button, Link, Text } from "@chakra-ui/react";
import Image from "next/image";

interface OwnProps {
  selectedOptionType?: BallType;
  percentage: string | number;
}

export const TwitterShareButton = ({
  selectedOptionType,
  percentage,
}: OwnProps) => {
  const ballClass = selectedOptionType
    ? BALLS_CONTENT[selectedOptionType].name
    : "";

  const customText =
    ballClass !== "" && percentage !== ""
      ? `${ballClass}に挑戦して正解率 ${percentage}% でした。\n`
      : "";

  const twitterQuery = new URLSearchParams({
    text: `ポケモン名前あてクイズ\n${customText}みんなもやってみてね\n`,
    hashtags: "ポケモンわかるかな",
    url: APP_URL,
  });
  return (
    <Link href={`http://twitter.com/share?${twitterQuery}`} w="100%">
      <Button w="100%" p={6} bgColor="#1D9BF0" color="white">
        <Image
          src={"/img/twitter-icon.png"}
          alt={"twitter-icon"}
          height={20}
          width={20}
        />
        <Text pl={2}>Twitter で共有</Text>
      </Button>
    </Link>
  );
};
