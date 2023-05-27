import { useState } from "react";
import { useRouter } from "next/router";
import { useGlobalState } from "@/hooks/useGlobalState";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Text,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  VStack,
  Button,
} from "@chakra-ui/react";
import { ProgressStatus } from "./pages/quiz/ProgressStatus";

interface OwnProps {
  fetchQuiz: () => void;
}

export const HeaderMenu = ({ fetchQuiz }: OwnProps) => {
  const [open, setOpen] = useState(false);
  const { globalState, globalStateDispatch } = useGlobalState();
  const router = useRouter();

  const onRetry = () => {
    globalStateDispatch({ type: "reStart" });
    fetchQuiz();
    setOpen(false);
  };
  const onGoToSelect = () => {
    globalStateDispatch({ type: "reStart" });
    router.push("/select");
  };

  return (
    <>
      <Button
        aria-label="Menu"
        border={`1px`}
        borderColor={"gray.300"}
        onClick={() => setOpen(true)}
      >
        <HamburgerIcon />
        <Text fontSize="sm" pl={2}>
          メニュー
        </Text>
      </Button>
      <Modal
        isOpen={open}
        onClose={() => setOpen(false)}
        motionPreset="slideInRight"
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>メニュー</ModalHeader>
          <ModalBody>
            <VStack gap={4} pb={8}>
              <ProgressStatus
                total={globalState.options?.numberOfQuiz || 0}
                primary={globalState.answered.correct}
                danger={globalState.answered.incorrect}
              />
              <Button
                py={6}
                color="white"
                bgColor="blue.500"
                w="75%"
                onClick={onRetry}
              >
                最初からやりなおす
              </Button>
              <Button
                py={6}
                color="white"
                bgColor="blue.500"
                w="75%"
                onClick={onGoToSelect}
              >
                難易度選択に戻る
              </Button>
              <Button
                py={6}
                bgColor="gray.300"
                w="75%"
                onClick={() => setOpen(false)}
              >
                メニューを閉じる
              </Button>
            </VStack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};
