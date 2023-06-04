import { SelectAction } from "@/pages/select";
import {
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { Dispatch } from "react";
import { BALLS_CONTENT } from "@/constants/balls";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { OptionsType } from "@/types";
import { useGlobalState } from "@/hooks/useGlobalState";
import { SettingForm } from "./SettingForm";

interface OwnProps {
  open: boolean;
  onClose: () => void;
  options: OptionsType;
  dispatch: Dispatch<SelectAction>;
}

export const SettingModal = ({
  open,
  onClose,
  options,
  dispatch,
}: OwnProps) => {
  const router = useRouter();
  const { globalStateDispatch } = useGlobalState();

  const onClickSubmit = () => {
    globalStateDispatch({ type: "updateOptions", value: options });
    router.push("/quiz");
  };

  const isCustom = options.selectedOptionType === "custom";

  const ballContent =
    isCustom || !options.selectedOptionType
      ? null
      : BALLS_CONTENT[options.selectedOptionType];

  if (!options.selectedOptionType) return null;

  return (
    <Modal isOpen={open} onClose={onClose} scrollBehavior="inside" size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{ballContent?.name || "難易度カスタマイズ"}</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {ballContent && (
            <Flex
              color={"gray.500"}
              alignItems={"center"}
              mt={-2}
              mb={6}
              p={2}
              bgColor={"gray.100"}
              borderRadius={8}
            >
              <InfoOutlineIcon mr={2} />
              <Text fontSize={"sm"}>{ballContent.description}</Text>
            </Flex>
          )}
          {/* TODO: 難易度の説明を実装する */}
          {/* {ballContent ?? <BallSetting></BallSetting>} */}
          {isCustom && <SettingForm dispatch={dispatch} options={options} />}
        </ModalBody>
        <ModalFooter columnGap={4}>
          <Button colorScheme={"orange"} onClick={onClickSubmit}>
            この設定で始める
          </Button>
          <Button onClick={onClose}>閉じる</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
