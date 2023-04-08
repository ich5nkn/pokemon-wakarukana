import { Box } from "@chakra-ui/react";

interface OwnProps {
  total: number;
  primary: number;
  danger: number;
}

export const ProgressBar = ({ total, primary, danger }: OwnProps) => {
  const primaryPer = Math.floor((primary / total) * 100);
  const dangerPer = Math.floor((danger / total) * 100);
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
        <Box h={8} bgColor="green.500" w={`${primaryPer}%`} />
        <Box h={8} bgColor="red.500" w={`${dangerPer}%`} />
      </Box>
      <Box textAlign={"right"}>{`${
        primary + danger + 1
      } / ${total} 問目 (正解数：${primary})`}</Box>
    </Box>
  );
};
