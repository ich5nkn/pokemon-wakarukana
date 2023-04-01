import { useReducer, useState } from "react";
import { BallCard } from "@/components/pages/select/BallCard";
import { SettingCard } from "@/components/pages/select/SettingCard";
import { SettingModal } from "@/components/pages/select/SettingModal";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { VERSIONS } from "@/constants/version";
import { SettingOptions } from "@/types";
import { BALLS_CONTENT, BallType } from "@/constants/balls";

export type OptionsType = {
  numberOfQuiz: number;
  isChoice: boolean;
  showHint: boolean;
  isSilhouette: boolean;
  hasRegion: boolean;
  hasAnotherForm: boolean;
  hasMega: boolean;
  hasGigantic: boolean;
  versions: SettingOptions;
};

const initialOptions: OptionsType = {
  numberOfQuiz: 10,
  isChoice: false,
  showHint: false,
  isSilhouette: false,
  hasRegion: true,
  hasAnotherForm: true,
  hasMega: true,
  hasGigantic: true,
  versions: VERSIONS.map(({ id }) => ({ id, value: true })),
};

export type SelectAction =
  | { type: "numberOfQuiz"; value: number }
  | { type: "isChoice"; value: boolean }
  | { type: "showHint"; value: boolean }
  | { type: "isSilhouette"; value: boolean }
  | { type: "hasRegion"; value: boolean }
  | { type: "hasAnotherForm"; value: boolean }
  | { type: "hasMega"; value: boolean }
  | { type: "hasGigantic"; value: boolean }
  | { type: "versions"; value: SettingOptions }
  | { type: "selectCard"; value: OptionsType }
  | { type: "reset" };

const optionsReducer = (
  options: OptionsType,
  action: SelectAction
): OptionsType => {
  switch (action.type) {
    case "versions":
      return { ...options, versions: [...action.value] };
    case "selectCard":
      return { ...action.value };
    case "reset":
      return initialOptions;

    default:
      return { ...options, [action.type]: action.value };
  }
};

const Select = () => {
  const [open, setOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<BallType | null>(null);
  const [options, dispatch] = useReducer(optionsReducer, initialOptions);

  const ballItems: BallType[] = ["monster", "super", "hyper", "dark", "master"];

  const getBallCardClickHandler = (type: BallType) => () => {
    dispatch({ type: "selectCard", value: BALLS_CONTENT[type].options });
    setSelectedType(type);
    setOpen(true);
  };

  const onClickSettingCard = () => {
    dispatch({ type: "reset" });
    setSelectedType(null);
    setOpen(true);
  };

  return (
    <Grid gap={8} py={4}>
      <Heading>難易度を選択してね</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        {ballItems.map((type) => (
          <GridItem key={type}>
            <BallCard type={type} onClick={getBallCardClickHandler(type)} />
          </GridItem>
        ))}
        <SettingCard onClick={onClickSettingCard} />
      </Grid>

      <SettingModal
        open={open}
        onClose={() => setOpen(false)}
        options={options}
        dispatch={dispatch}
        selectedType={selectedType}
      />
    </Grid>
  );
};

export default Select;
