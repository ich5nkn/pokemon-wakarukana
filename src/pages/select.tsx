import { useReducer, useState } from "react";
import { BallCard } from "@/components/pages/select/BallCard";
import { SettingCard } from "@/components/pages/select/SettingCard";
import { SettingModal } from "@/components/pages/select/SettingModal";
import { Grid, Heading } from "@chakra-ui/react";
import { VERSIONS } from "@/constants/version";
import { SettingOptions } from "@/types";

export type OptionsType = {
  isChoice: boolean;
  showHint: boolean;
  hasRegion: boolean;
  hasAnotherForm: boolean;
  hasMega: boolean;
  hasGigantic: boolean;
  versions: SettingOptions;
};

export type SelectAction =
  | { type: "isChoice"; value: boolean }
  | { type: "showHint"; value: boolean }
  | { type: "hasRegion"; value: boolean }
  | { type: "hasAnotherForm"; value: boolean }
  | { type: "hasMega"; value: boolean }
  | { type: "hasGigantic"; value: boolean }
  | { type: "versions"; value: SettingOptions };

const initialOptions: OptionsType = {
  isChoice: false,
  showHint: false,
  hasRegion: true,
  hasAnotherForm: true,
  hasMega: true,
  hasGigantic: true,
  versions: VERSIONS.map(({ id, name }) => ({ id, name, value: true })),
};

const optionsReducer = (
  options: OptionsType,
  action: SelectAction
): OptionsType => {
  switch (action.type) {
    case "versions":
      return { ...options, versions: [...action.value] };
    case "isChoice":
      return { ...options, isChoice: action.value };
    case "hasRegion":
      return { ...options, hasRegion: action.value };
    case "hasAnotherForm":
      return { ...options, hasAnotherForm: action.value };
    case "hasMega":
      return { ...options, hasMega: action.value };
    case "hasGigantic":
      return { ...options, hasGigantic: action.value };
    default:
      return options;
  }
};

const Select = () => {
  const [open, setOpen] = useState(false);
  const [options, dispatch] = useReducer(optionsReducer, initialOptions);

  return (
    <Grid gap={8} my={12}>
      <Heading>難易度を選択してね</Heading>
      <Grid templateColumns="repeat(2, 1fr)" gap={4}>
        <BallCard type="monster" onClick={() => {}} />
        <BallCard type="super" onClick={() => {}} />
        <BallCard type="hyper" onClick={() => {}} />
        <BallCard type="master" onClick={() => {}} />
      </Grid>
      <SettingCard
        onClick={() => {
          setOpen(true);
        }}
      />
      <SettingModal
        open={open}
        onClose={() => setOpen(false)}
        options={options}
        dispatch={dispatch}
      />
    </Grid>
  );
};

export default Select;
