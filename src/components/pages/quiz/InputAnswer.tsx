import { useRef, useState, KeyboardEvent } from "react";
import { Answer } from "@/types";
import { Box, Text, Button, Center, Input, VStack } from "@chakra-ui/react";

interface OwnProps {
  hasSecondName: boolean;
  onSend: (answer: Answer) => void;
}

export const InputAnswer = ({ hasSecondName, onSend }: OwnProps) => {
  const [name, setName] = useState("");
  const [name2, setName2] = useState<string | undefined>();
  const inputRef = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const submit = () => {
    onSend({ name, name2 });
    setName("");
    setName2(undefined);
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      !(event.metaKey && event.key === "Enter") &&
      !(event.ctrlKey && event.key === "Enter")
    )
      return;
    if (!name) return;
    if (input2Ref.current && !name2) {
      input2Ref.current.focus();
      return;
    }
    submit();
  };
  return (
    <VStack gap={4}>
      <Box w="100%">
        <Text fontWeight={700}>ポケモンの名前</Text>
        <Input
          ref={inputRef}
          value={name}
          onChange={(e) => setName(e.target.value)}
          borderColor={"gray.400"}
          onKeyDown={onKeyDown}
        />
      </Box>
      {hasSecondName && (
        <Box w="100%">
          <Text fontWeight={700}>しゅるいの名前</Text>
          <Input
            ref={input2Ref}
            value={name2 || ""}
            onChange={(e) => setName2(e.target.value)}
            borderColor={"gray.400"}
            placeholder="〇〇のすがた / 〇〇フォルム など"
            _placeholder={{ opacity: 0.6 }}
            onKeyDown={onKeyDown}
          />
        </Box>
      )}
      <Center>
        <Button onClick={submit} colorScheme={"orange"} px={12} py={6}>
          回答する
        </Button>
      </Center>
    </VStack>
  );
};
