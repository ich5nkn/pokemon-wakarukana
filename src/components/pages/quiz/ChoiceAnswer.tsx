import { Answer, Selector } from "@/types";
import { Box, VStack, Text } from "@chakra-ui/react";

interface OwnProps {
  selector?: Selector;
  onSelect: (answer: Answer) => void;
}

export const ChoiceAnswer = ({ selector, onSelect }: OwnProps) => {
  if (!selector) return <></>;
  return (
    <VStack>
      {selector.map((answer) => (
        <Box
          key={`${answer.name}${answer.name2 || ""}`}
          onClick={() => onSelect(answer)}
          borderRadius={8}
          border={"2px solid"}
          width={"full"}
          textAlign={"center"}
          p={4}
        >
          <Text fontSize={"lg"} fontWeight={700}>
            {answer.name}
          </Text>
          {answer.name2 && <Text>{`（${answer.name2}）`}</Text>}
        </Box>
      ))}
    </VStack>
  );
};
