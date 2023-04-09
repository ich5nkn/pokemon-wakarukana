import { replaceIsNaN } from "@/utils";
import { Box } from "@chakra-ui/react";

interface OwnProps {
  total: number;
  primary: number;
  danger: number;
}

export const ProgressBar = ({ total, primary, danger }: OwnProps) => {
  const primaryWidth = Math.floor((primary / total) * 100);
  const dangerWidth = Math.floor((danger / total) * 100);
  const percentage = replaceIsNaN(
    Math.round((primary / (primary + danger)) * 1000) / 10
  );
  return (
    <Box>
      <Box
        h={8}
        w={"100%"}
        bgColor="gray.300"
        borderRadius={4}
        overflow={"hidden"}
        display={"flex"}
      >
        <Box h={8} bgColor="green.500" w={`${primaryWidth}%`} />
        <Box h={8} bgColor="red.500" w={`${dangerWidth}%`} />
      </Box>
      <Box textAlign={"right"}>{`${
        primary + danger + 1
      } / ${total} 問目 (正解率：${percentage}%)`}</Box>
    </Box>
  );
};
