import { Action, OptionsType } from "@/pages/select";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
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
          <Options
            title="初登場シリーズ"
            options={options.versions}
            updateOptions={updateVersion}
          />
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
