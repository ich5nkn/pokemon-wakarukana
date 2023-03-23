import { useReducer, useState } from "react";
import { BallCard } from "@/components/pages/select/BallCard";
import { SettingCard } from "@/components/pages/select/SettingCard";
import { SettingModal } from "@/components/pages/select/SettingModal";
import { Grid, Heading } from "@chakra-ui/react";
import { VERSIONS } from "@/constants/version";
import { SettingOptions } from "@/types";

export type OptionsType = {
  versions: SettingOptions;
};

export type Action = {
  type: "versions";
  value: SettingOptions;
};

const initialOptions: OptionsType = {
  versions: VERSIONS.map(({ id, name }) => ({ id, name, value: false })),
};

const optionsReducer = (options: OptionsType, action: Action): OptionsType => {
  switch (action.type) {
    case "versions":
      return { ...options, versions: action.value };
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
