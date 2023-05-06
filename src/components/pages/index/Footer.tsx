import { Box, Text } from "@chakra-ui/react";

export const Footer = () => {
  return (
    <Box textAlign={"left"} padding={6} bgColor={"blue.300"} mt={4} mb={-4}>
      <Text
        color="white"
        fontSize={"lg"}
        fontWeight={700}
        borderBottom={"1px solid"}
        mb={4}
      >
        Information
      </Text>
      <Text color="white" mt={2} fontSize="sm" pl={2}>
        利用規約
      </Text>
      <Text color="white" mt={2} fontSize="sm" pl={2}>
        連絡先 ( Twitter )
      </Text>
      <Text color="white" mt={2} fontSize="sm" pl={2}>
        GitHub
      </Text>
    </Box>
  );
};
