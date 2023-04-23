import { ProgressBar } from "@/components/ProgressBar";
import { replaceIsNaN } from "@/utils";
import { Box } from "@chakra-ui/react";

interface OwnProps {
  total: number;
  primary: number;
  danger: number;
  percentage: number;
}

export const ResultStatusView = ({
  total,
  primary,
  danger,
  percentage,
}: OwnProps) => {
  const resultText = `${total}問中 ${primary}問正解`;
  const percentageText = `（正解率：${replaceIsNaN(percentage)}%）`;
  return (
    <Box w="100%">
      <ProgressBar total={total} primary={primary} danger={danger} />
      <Box textAlign={"right"} pt={2}>{`${resultText}${percentageText}`}</Box>
    </Box>
  );
};
