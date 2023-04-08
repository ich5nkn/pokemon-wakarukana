import { Box, VStack, Text } from "@chakra-ui/react";

interface OwnProps {
  answers: string[];
  onSelect: (answer: string) => void;
}

export const ChoiceAnswer = ({ answers, onSelect }: OwnProps) => {
  return (
    <VStack>
      {answers.map((answer) => (
        <Box
          key={answer}
          onClick={() => onSelect(answer)}
          borderRadius={8}
          border={"2px solid"}
          width={"full"}
          textAlign={"center"}
          p={4}
        >
          <Text fontSize={"lg"} fontWeight={700}>
            {answer}
          </Text>
        </Box>
      ))}
    </VStack>
  );
};
