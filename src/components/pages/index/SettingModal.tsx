import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@chakra-ui/react";

interface OwnProps {
  open: boolean;
  onClose: () => void;
}

export const SettingModal = ({ open, onClose }: OwnProps) => (
  <Modal isOpen={open} onClose={onClose} scrollBehavior="inside" size="full">
    <ModalContent>
      <ModalHeader>難易度カスタマイズ</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        body
        {[...Array(100)].map((_, idx) => (
          <div key={idx}>{idx}</div>
        ))}
      </ModalBody>
      <ModalFooter columnGap={4}>
        <Button colorScheme={"orange"}>この設定で始める</Button>
        <Button>閉じる</Button>
      </ModalFooter>
    </ModalContent>
  </Modal>
);
