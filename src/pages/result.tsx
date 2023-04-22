import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { useGlobalState } from "@/hooks/useGlobalState";
import { BALLS_CONTENT } from "@/constants/balls";

const Result = () => {
  const { globalState } = useGlobalState();
  const selectedOptionType = useMemo(() => {
    if (!globalState.options?.selectedOptionType) return null;
    if (globalState.options.selectedOptionType === "custom")
      return "カスタム難易度";
    return BALLS_CONTENT[globalState.options.selectedOptionType].name;
  }, [globalState.options]);
  return (
    <Box>
      <Box>{selectedOptionType}</Box>
      <Box>{`正解数：${globalState.answered.correct}`}</Box>
      <Box>{`不正解数：${globalState.answered.incorrect}`}</Box>
    </Box>
  );
};

export default Result;
