import { Action, OptionsType } from "@/pages/select";
import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Spacer,
  Switch,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dispatch } from "react";
import { Options } from "./Options";

interface OwnProps {
  open: boolean;
  onClose: () => void;
  options: OptionsType;
  dispatch: Dispatch<Action>;
}

export const SettingModal = ({
  open,
  onClose,
  options,
  dispatch,
}: OwnProps) => {
  const updateVersion = (option: OptionsType["versions"]) => {
    dispatch({ type: "versions", value: option });
  };
  return (
    <Modal isOpen={open} onClose={onClose} scrollBehavior="inside" size="full">
      <ModalContent>
        <ModalHeader>難易度カスタマイズ</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* TODO: 共通化 */}
          <Text fontSize={"lg"} fontWeight={700} my={2}>
            出題形式
          </Text>
          <VStack spacing={2} align={"left"} my={2}>
            <Flex>
              4択で出題する
              <Spacer /> <Switch />
            </Flex>
            <Box>
              <Flex color="gray.300">
                シルエットで出題する（開発中👩‍💻）
                <Spacer /> <Switch disabled />
              </Flex>
            </Box>
          </VStack>
          <Text fontSize={"lg"} fontWeight={700} my={2}>
            出題範囲
          </Text>
          <VStack spacing={2} align={"left"} my={2}>
            <Box>
              <Flex>
                リージョンフォームを含む
                <Spacer /> <Switch />
              </Flex>
              <Text fontSize="sm" color="gray.400" pl={2}>
                例：ニャース（ガラルのすがた）など
              </Text>
            </Box>
            <Box>
              <Flex>
                フォルム違いを含む
                <Spacer /> <Switch />
              </Flex>
              <Text fontSize="sm" color="gray.400" pl={2}>
                例：デオキシス（アタックフォルム）など
              </Text>
            </Box>
            <Flex>
              メガシンカを含む
              <Spacer /> <Switch />
            </Flex>
            <Flex>
              キョダイマックスを含む
              <Spacer /> <Switch />
            </Flex>
          </VStack>
          <Options
            title="初登場シリーズで絞り込む"
            options={options.versions}
            updateOptions={updateVersion}
          />
          {/* TODO: 問題数の選択 */}
        </ModalBody>
        <ModalFooter columnGap={4}>
          <Button colorScheme={"orange"} onClick={onClose}>
            この設定で始める
          </Button>
          <Button onClick={onClose}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
