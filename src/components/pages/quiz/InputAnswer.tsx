import { useRef, useState, KeyboardEvent } from "react";
import { Answer } from "@/types";
import { Box, Text, Button, Center, Input, VStack } from "@chakra-ui/react";
import { isMobile } from "@/utils";

interface OwnProps {
  inputsCount: 1 | 2 | 3;
  onSend: (answer: Answer) => void;
}

type Inputs = {
  name: string;
  name2?: string;
  name3?: string;
};

export const InputAnswer = ({ inputsCount, onSend }: OwnProps) => {
  const [inputs, setInputs] = useState<Inputs>({ name: "" });
  const inputRef = useRef<HTMLInputElement>(null);
  const input2Ref = useRef<HTMLInputElement>(null);
  const input3Ref = useRef<HTMLInputElement>(null);
  const submit = () => {
    onSend(inputs);
    setInputs({ name: "" });
    if (inputRef.current && !isMobile()) {
      inputRef.current.focus();
    }
  };

  const onKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (
      !(event.metaKey && event.key === "Enter") &&
      !(event.ctrlKey && event.key === "Enter")
    )
      return;
    if (!inputs.name) return;
    if (input2Ref.current && !inputs.name2) {
      input2Ref.current.focus();
      return;
    }
    if (input3Ref.current && !inputs.name3) {
      input3Ref.current.focus();
      return;
    }
    submit();
  };
  return (
    <VStack gap={4}>
      <input ref={inputRef} />
      <Box w="100%">
        <Text fontWeight={700}>ポケモンの名前</Text>
        <Input
          ref={inputRef}
          value={inputs.name}
          onChange={(e) =>
            setInputs((inputs) => ({ ...inputs, name: e.target.value }))
          }
          borderColor={"gray.400"}
          onKeyDown={onKeyDown}
        />
      </Box>
      {inputsCount >= 2 && (
        <Box w="100%">
          <Text fontWeight={700}>しゅるいの名前</Text>
          <Input
            ref={input2Ref}
            value={inputs.name2 || ""}
            onChange={(e) =>
              setInputs((inputs) => ({ ...inputs, name2: e.target.value }))
            }
            borderColor={"gray.400"}
            placeholder="〇〇のすがた / 〇〇フォルム など"
            _placeholder={{ opacity: 0.6 }}
            onKeyDown={onKeyDown}
          />
          {inputsCount === 3 && (
            <Input
              ref={input3Ref}
              value={inputs.name3 || ""}
              onChange={(e) =>
                setInputs((inputs) => ({ ...inputs, name3: e.target.value }))
              }
              borderColor={"gray.400"}
              placeholder="〇〇のすがた / 〇〇フォルム など"
              _placeholder={{ opacity: 0.6 }}
              onKeyDown={onKeyDown}
            />
          )}
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
