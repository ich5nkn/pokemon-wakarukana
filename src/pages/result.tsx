import { Box, Button, Text, VStack } from "@chakra-ui/react";
import Image from "next/image";
import { useGlobalState } from "@/hooks/useGlobalState";
import { SelectedTypeView } from "@/components/pages/result/SelectedTypeView";
import { ResultStatusView } from "@/components/pages/result/ResultStatusView";

const Result = () => {
  const { globalState } = useGlobalState();
  return (
    <VStack rowGap={4}>
      <SelectedTypeView
        selectedTypeOptions={globalState.options?.selectedOptionType}
      />
      <ResultStatusView
        total={globalState.answered.correct + globalState.answered.incorrect}
        primary={globalState.answered.correct}
        danger={globalState.answered.incorrect}
      />
      <Button w="100%" p={6} bgColor="#1D9BF0" color="white">
        <Image
          src={"/img/twitter-icon.png"}
          alt={"twitter-icon"}
          height={20}
          width={20}
        />
        <Text pl={2}>Twitter で共有</Text>
      </Button>
      <Button w="100%" p={6} bgColor="blue.500" color="white">
        もういちど遊ぶ
      </Button>
    </VStack>
  );
};

export default Result;
