import { replaceIsNaN } from "@/utils";
import { Box } from "@chakra-ui/react";
import { ProgressBar } from "../../ProgressBar";

interface OwnProps {
  total: number;
  primary: number;
  danger: number;
}

export const ProgressStatus = ({ total, primary, danger }: OwnProps) => {
  const percentage = Math.round((primary / (primary + danger)) * 1000) / 10;
  const stepText =
    primary + danger + 1 === total
      ? "最終問題！"
      : `${primary + danger + 1} / ${total} 問目`;
  const percentageText = `（正解率：${replaceIsNaN(percentage)}%）`;
  return (
    <Box w="100%" pb={4}>
      <ProgressBar total={total} primary={primary} danger={danger} />
      <Box textAlign={"right"}>{`${stepText}${percentageText}`}</Box>
    </Box>
  );
};
