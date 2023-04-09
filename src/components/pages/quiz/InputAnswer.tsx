import { useState } from "react";
import { Answer } from "@/types";
import { Box, Text, Button, Center, Input, VStack } from "@chakra-ui/react";

interface OwnProps {
  hasSecondName: boolean;
  onSend: (answer: Answer) => void;
}

export const InputAnswer = ({ hasSecondName, onSend }: OwnProps) => {
  const [name, setName] = useState("");
  const [name2, setName2] = useState<string | undefined>();
  const onClick = () => {
    onSend({ name, name2 });
    setName("");
    setName2(undefined);
  };
  return (
    <VStack gap={4}>
      <Box w="100%">
        <Text fontWeight={700}>ポケモンの名前</Text>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          borderColor={"gray.400"}
        />
      </Box>
      {hasSecondName && (
        <Box w="100%">
          <Text fontWeight={700}>しゅるいの名前</Text>
          <Input
            value={name2 || ""}
            onChange={(e) => setName2(e.target.value)}
            borderColor={"gray.400"}
            placeholder="〇〇のすがた / 〇〇フォルム など"
            _placeholder={{ opacity: 0.6 }}
          />
        </Box>
      )}
      <Center>
        <Button onClick={onClick} colorScheme={"orange"} px={12} py={6}>
          回答する
        </Button>
      </Center>
    </VStack>
  );
};
