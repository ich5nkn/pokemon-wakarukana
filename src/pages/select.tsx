import { useReducer, useState } from "react";
import { BallCard } from "@/components/pages/select/BallCard";
import { SettingModal } from "@/components/pages/select/SettingModal";
import { Grid, GridItem, Heading } from "@chakra-ui/react";
import { OptionsType, SettingOptions } from "@/types";
import { BALLS_CONTENT, BallType } from "@/constants/balls";
import { initialOptions } from "@/constants/options";
import { Header } from "@/components/Header";
import Head from "next/head";

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
  const [options, dispatch] = useReducer(optionsReducer, initialOptions);

  const ballItems: BallType[] = [
    "monster",
    "super",
    "hyper",
    "dark",
    "master",
    "custom",
  ];

  const getBallCardClickHandler = (type: BallType) => () => {
    dispatch({
      type: "selectCard",
      value: { ...BALLS_CONTENT[type].options },
    });
    setOpen(true);
  };

  return (
    <>
      <Head>
        <title>ポケモンわかるかな? | 難易度選択</title>
      </Head>
      <Header />
      <Grid gap={8} py={4}>
        <Heading>難易度を選択してね</Heading>
        <Grid templateColumns="repeat(2, 1fr)" gap={4}>
          {ballItems.map((type) => (
            <GridItem key={type}>
              <BallCard type={type} onClick={getBallCardClickHandler(type)} />
            </GridItem>
          ))}
        </Grid>

        <SettingModal
          open={open}
          onClose={() => setOpen(false)}
          options={options}
          dispatch={dispatch}
        />
      </Grid>
    </>
  );
};

export default Select;
