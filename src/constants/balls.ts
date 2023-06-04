import { OptionsType } from "@/types";
import { VERSIONS } from "./version";
import { initialOptions } from "./options";

export type BallType =
  | "monster"
  | "super"
  | "hyper"
  | "dark"
  | "master"
  | "custom";

export type BallContent = {
  name: string;
  description?: string;
  imgPath: string;
  alt: string;
  color: string;
  options: OptionsType;
};

export const BALLS_CONTENT: { [key in BallType]: BallContent } = {
  monster: {
    name: "モンスターボール級",
    description:
      "４択クイズなので、ポケモンを知らない方でも気軽にプレイできます。",
    imgPath: "/img/balls/monster-ball.png",
    alt: "monster-ball",
    color: "#EB9494",
    options: {
      selectedOptionType: "monster",
      numberOfQuiz: 10,
      isChoice: true,
      showHint: false,
      isSilhouette: false,
      hasRegion: false,
      hasAnotherForm: false,
      hasMega: false,
      hasGigantic: false,
      versions: VERSIONS.map(({ id, name }) => ({
        id,
        name,
        value: [1].includes(id),
      })),
    },
  },
  super: {
    name: "スーパーボール級",
    description: "昔のポケモンや最近のポケモンをやったことがある人向けです。",
    imgPath: "/img/balls/super-ball.png",
    alt: "super-ball",
    color: "#9594EB",
    options: {
      selectedOptionType: "super",
      numberOfQuiz: 15,
      isChoice: false,
      showHint: true,
      isSilhouette: false,
      hasRegion: false,
      hasAnotherForm: false,
      hasMega: false,
      hasGigantic: false,
      versions: VERSIONS.map(({ id, name }) => ({
        id,
        name,
        value: [1, 2, 9].includes(id),
      })),
    },
  },
  hyper: {
    name: "ハイパーボール級",
    description: "全シリーズのポケモンをだいたい知ってる人向けです。",
    imgPath: "/img/balls/hyper-ball.png",
    alt: "hyper-ball",
    color: "#EBD294",
    options: {
      selectedOptionType: "hyper",
      numberOfQuiz: 20,
      isChoice: false,
      showHint: false,
      isSilhouette: false,
      hasRegion: true,
      hasAnotherForm: false,
      hasMega: true,
      hasGigantic: true,
      versions: VERSIONS.map(({ id, name }) => ({
        id,
        name,
        value: true,
      })),
    },
  },
  dark: {
    name: "ダークボール級",
    description: "問題がシルエット化されて出題されます。「だーれだ？」",
    imgPath: "/img/balls/dark-ball.png",
    alt: "dark-ball",
    color: "#6AA870",
    options: {
      selectedOptionType: "dark",
      numberOfQuiz: 20,
      isChoice: false,
      showHint: false,
      isSilhouette: true,
      hasRegion: true,
      hasAnotherForm: false,
      hasMega: true,
      hasGigantic: true,
      versions: VERSIONS.map(({ id, name }) => ({
        id,
        name,
        value: true,
      })),
    },
  },
  master: {
    name: "マスターボール級",
    description:
      "ポケモンマスター向け！全問正解すると、殿堂入りできます（開発中🙇‍♀️）",
    imgPath: "/img/balls/master-ball.png",
    alt: "master-ball",
    color: "#D994EB",
    options: {
      selectedOptionType: "master",
      numberOfQuiz: 100,
      isChoice: false,
      showHint: false,
      isSilhouette: false,
      hasRegion: true,
      hasAnotherForm: true,
      hasMega: true,
      hasGigantic: true,
      versions: VERSIONS.map(({ id, name }) => ({
        id,
        name,
        value: true,
      })),
    },
  },
  custom: {
    name: "オリジナル級",
    imgPath: "/img/balls/metamon.png",
    alt: "customize",
    color: "#9B9191",
    options: {
      ...initialOptions,
      selectedOptionType: "custom",
    },
  },
} as const;
