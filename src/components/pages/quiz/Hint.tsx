import { Box } from "@chakra-ui/react";

interface OwnProps {
  hint?: string;
}

export const Hint = ({ hint }: OwnProps) => {
  if (!hint) return null;
  return (
    <Box textAlign={"center"} fontSize="lg">
      （ヒント：{hint}）
    </Box>
  );
};
