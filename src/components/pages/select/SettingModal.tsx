import { OptionsType, SelectAction } from "@/pages/select";
import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Dispatch } from "react";
import { Options } from "./Options";
import { SettingNumberOption } from "./SettingNumberOption";
import { SettingSwitchOption } from "./SettingSwitchOption";

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
  const toggleSwitch = (
    type: Exclude<SelectAction["type"], "versions" | "numberOfQuiz">
  ) => {
    dispatch({ type, value: !options[type] });
  };
  const updateNumberOfQuiz = (num: number) => {
    dispatch({ type: "numberOfQuiz", value: num });
  };
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
          <VStack spacing={4} align={"left"} my={2}>
            <SettingNumberOption
              title="出題数"
              value={options["numberOfQuiz"]}
              onChange={updateNumberOfQuiz}
            />
            <SettingSwitchOption
              title="4択で出題する"
              value={options["isChoice"]}
              onChange={() => toggleSwitch("isChoice")}
            />
            <SettingSwitchOption
              title="ヒントを表示する"
              value={options["showHint"]}
              onChange={() => toggleSwitch("showHint")}
            />
            <SettingSwitchOption
              title="シルエットで出題する"
              value={options["isSilhouette"]}
              onChange={() => toggleSwitch("isSilhouette")}
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
            />
            <SettingSwitchOption
              title="フォルム違いを含む"
              caption="例：デオキシス（アタックフォルム）など"
              value={options["hasAnotherForm"]}
              onChange={() => toggleSwitch("hasAnotherForm")}
            />
            <SettingSwitchOption
              title="メガシンカを含む"
              value={options["hasMega"]}
              onChange={() => toggleSwitch("hasMega")}
            />
            <SettingSwitchOption
              title="キョダイマックスを含む"
              value={options["hasGigantic"]}
              onChange={() => toggleSwitch("hasGigantic")}
            />
            <Options
              title="初登場シリーズで絞り込む"
              options={options.versions}
              updateOptions={updateVersion}
            />
          </VStack>
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
