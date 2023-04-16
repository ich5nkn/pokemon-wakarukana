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
  VStack,
} from "@chakra-ui/react";
import { Dispatch } from "react";
import { CheckboxOptions } from "@/components/CheckboxOptions";
import { SettingNumberOption } from "./SettingNumberOption";
import { SettingSwitchOption } from "./SettingSwitchOption";
import { BALLS_CONTENT, BallType } from "@/constants/balls";
import { InfoOutlineIcon } from "@chakra-ui/icons";
import { useRouter } from "next/router";
import { OptionsType } from "@/types";
import { useGlobalState } from "@/hooks/useGlobalState";

interface OwnProps {
  open: boolean;
  onClose: () => void;
  options: OptionsType;
  dispatch: Dispatch<SelectAction>;
  selectedType: BallType | null;
}

export const SettingModal = ({
  open,
  onClose,
  options,
  dispatch,
  selectedType,
}: OwnProps) => {
  const router = useRouter();
  const toggleSwitch = (
    type: Exclude<
      SelectAction["type"],
      "versions" | "numberOfQuiz" | "selectCard" | "reset"
    >
  ) => {
    dispatch({ type, value: !options[type] });
  };
  const { globalStateDispatch } = useGlobalState();

  const updateNumberOfQuiz = (num: number) => {
    dispatch({ type: "numberOfQuiz", value: num });
  };

  const updateVersion = (option: OptionsType["versions"]) => {
    dispatch({ type: "versions", value: option });
  };

  const onClickSubmit = () => {
    globalStateDispatch({ type: "updateOptions", value: options });
    router.push("/quiz");
  };

  const ballContent = selectedType ? BALLS_CONTENT[selectedType] : null;

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
          <Text fontSize={"lg"} fontWeight={700} my={2}>
            出題形式
          </Text>
          <VStack spacing={4} align={"left"} my={2}>
            <SettingNumberOption
              title="出題数"
              value={options["numberOfQuiz"]}
              onChange={updateNumberOfQuiz}
              disabled={!!selectedType}
            />
            <SettingSwitchOption
              title="4択で出題する"
              value={options["isChoice"]}
              onChange={() => toggleSwitch("isChoice")}
              disabled={!!selectedType}
            />
            <SettingSwitchOption
              title="ヒントを表示する"
              value={options["showHint"]}
              onChange={() => toggleSwitch("showHint")}
              disabled={!!selectedType}
            />
            <SettingSwitchOption
              title="シルエットで出題する"
              value={options["isSilhouette"]}
              onChange={() => toggleSwitch("isSilhouette")}
              disabled={!!selectedType}
            />
          </VStack>
          <Text fontSize={"lg"} fontWeight={700} my={2}>
            出題範囲
          </Text>
          <VStack spacing={4} align={"left"} my={2}>
            <SettingSwitchOption
              title="リージョンフォームを含む"
              caption="例：ニャース（ガラルのすがた）など"
              value={options["hasRegion"]}
              onChange={() => toggleSwitch("hasRegion")}
              disabled={!!selectedType}
            />
            <SettingSwitchOption
              title="フォルム違いを含む"
              caption="例：デオキシス（アタックフォルム）など"
              value={options["hasAnotherForm"]}
              onChange={() => toggleSwitch("hasAnotherForm")}
              disabled={!!selectedType}
            />
            <SettingSwitchOption
              title="メガシンカを含む"
              value={options["hasMega"]}
              onChange={() => toggleSwitch("hasMega")}
              disabled={!!selectedType}
            />
            <SettingSwitchOption
              title="キョダイマックスを含む"
              value={options["hasGigantic"]}
              onChange={() => toggleSwitch("hasGigantic")}
              disabled={!!selectedType}
            />
            <CheckboxOptions
              title="初登場シリーズで絞り込む"
              options={options.versions}
              updateOptions={updateVersion}
              disabled={!!selectedType}
            />
          </VStack>
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
