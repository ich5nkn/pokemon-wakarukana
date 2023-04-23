import { Button, Link, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useGlobalState } from "@/hooks/useGlobalState";
import { SelectedTypeView } from "@/components/pages/result/SelectedTypeView";
import { ResultStatusView } from "@/components/pages/result/ResultStatusView";
import { BALLS_CONTENT } from "@/constants/balls";
import { replaceIsNaN } from "@/utils";
import { APP_URL } from "@/constants/url";

const Result = () => {
  const router = useRouter();
  const { globalState, globalStateDispatch } = useGlobalState();

  const ballClass = globalState.options?.selectedOptionType
    ? BALLS_CONTENT[globalState.options.selectedOptionType].name
    : "";
  const total = globalState.answered.correct + globalState.answered.incorrect;
  const percentage = replaceIsNaN(
    Math.round((globalState.answered.correct / total) * 1000) / 10,
    ""
  );

  const customText =
    ballClass !== "" && percentage !== ""
      ? `${ballClass}に挑戦して正解率 ${percentage}% でした。\n`
      : "";

  const twitterQuery = new URLSearchParams({
    text: `ポケモン名前あてクイズ\n${customText}みんなもやってみてね\n`,
    hashtags: "ポケモンわかるかな",
    url: APP_URL,
  });

  const onClickNewGame = () => {
    globalStateDispatch({ type: "reStart" });
    router.push("/select");
  };

  return (
    <VStack rowGap={4}>
      <SelectedTypeView
        selectedTypeOptions={globalState.options?.selectedOptionType}
      />
      <ResultStatusView
        total={total}
        primary={globalState.answered.correct}
        danger={globalState.answered.incorrect}
        percentage={Number(percentage)}
      />
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
      <Button
        w="100%"
        p={6}
        bgColor="blue.500"
        color="white"
        onClick={onClickNewGame}
      >
        もういちど遊ぶ
      </Button>
    </VStack>
  );
};

export default Result;
