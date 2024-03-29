import { VStack } from "@chakra-ui/react";
import { useGlobalState } from "@/hooks/useGlobalState";
import { SelectedTypeView } from "@/components/pages/result/SelectedTypeView";
import { ResultStatusView } from "@/components/pages/result/ResultStatusView";
import { replaceIsNaN } from "@/utils";
import { TwitterShareButton } from "@/components/pages/result/TwitterShareButton";
import { ReturnSelectButton } from "@/components/pages/result/ReturnSelectButton";
import { Header } from "@/components/Header";
import Head from "next/head";
import { RestartButton } from "@/components/pages/result/RestartButton";

const Result = () => {
  const { globalState } = useGlobalState();

  const total = globalState.answered.correct + globalState.answered.incorrect;
  const percentage = replaceIsNaN(
    Math.round((globalState.answered.correct / total) * 1000) / 10,
    ""
  );

  return (
    <>
      <Head>
        <title>ポケモンわかるかな? | 結果確認</title>
      </Head>
      <Header />
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
        <TwitterShareButton
          selectedOptionType={globalState.options?.selectedOptionType}
          percentage={percentage}
        />
        <RestartButton />
        <ReturnSelectButton />
      </VStack>
    </>
  );
};

export default Result;
