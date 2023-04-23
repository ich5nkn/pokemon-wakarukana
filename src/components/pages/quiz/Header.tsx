import { useState } from "react";
import { HamburgerIcon } from "@chakra-ui/icons";
import {
  Button,
  Flex,
  IconButton,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import { ProgressStatus } from "./ProgressStatus";
import { useGlobalState } from "@/hooks/useGlobalState";
import { useRouter } from "next/router";

interface OwnProps {
  fetchQuiz: () => void;
}

export const Header = ({ fetchQuiz }: OwnProps) => {
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
    <Flex>
      <Spacer />
      <IconButton
        mt={-4}
        aria-label="Menu"
        onClick={() => setOpen(true)}
        icon={<HamburgerIcon />}
        variant="outline"
      />
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
    </Flex>
  );
};
