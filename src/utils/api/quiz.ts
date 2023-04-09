import { POKEMONS } from "@/constants/pokemons";
import { randomMultiplePick, randomPick, shuffleArray } from "..";
import { Answer, Pokemon, OptionsType, Selector } from "@/types";
import { FixedLengthArray } from "@/types/utils";

export const getNextPokemon = (
  displayed: string[],
  options: OptionsType
): { no: string; hasSecondName: boolean } | undefined => {
  const filteredData = POKEMONS.filter(
    (pokemon) =>
      !displayed.some((displayed) => displayed === pokemon.no) &&
      (options.hasMega ? true : !pokemon.isMega) &&
      (options.hasGigantic ? true : !pokemon.isGigantic) &&
      (options.hasRegion ? true : !pokemon.isRegion) &&
      (options.hasAnotherForm ? true : !pokemon.isAnotherForm) &&
      options.versions
        .filter(({ value }) => value)
        .some(({ id }) => id === pokemon.version)
  );
  const pickPokemon = randomPick(filteredData);
  if (!pickPokemon) return;
  return { no: pickPokemon.no, hasSecondName: !!pickPokemon.name2 };
};

export const getSelector = (
  options: OptionsType,
  nextNo?: string
): Selector | undefined => {
  if (!nextNo) return;
  const nextPokemon = POKEMONS.filter(({ no }) => no === nextNo);
  if (!nextPokemon.length) return;
  // TODO: ４択の候補を取得する際に、最初の１文字が同じなど、近い値を持ってこれるとなお良い
  const pickAnswer = (pokemon?: Pokemon): Answer => {
    if (!pokemon)
      return {
        name: "",
      };
    return {
      name: pokemon.name,
      name2: pokemon.name2,
    };
  };
  const dummyAnswers = randomMultiplePick(
    POKEMONS.filter(
      ({ no, isMega, isGigantic, isRegion, isAnotherForm }) =>
        no !== nextNo &&
        (options.hasMega ? true : !isMega) &&
        (options.hasGigantic ? true : !isGigantic) &&
        (options.hasRegion ? true : !isRegion) &&
        (options.hasAnotherForm ? true : !isAnotherForm)
    ),
    3
  ).map((pokemon) => pickAnswer(pokemon)) as FixedLengthArray<Answer, 3>;

  const selector: Selector = [pickAnswer(nextPokemon[0]), ...dummyAnswers];

  return shuffleArray(selector);
};

export const judgeAnswer = (
  quizNo: string,
  name1: string,
  name2?: string
): boolean => {
  const targetPokemon = POKEMONS.filter(({ no }) => no === quizNo);
  if (!targetPokemon.length) return false;
  // TODO: ひらがな / カタカナの許容や、フォーマットの判定を甘くする処理をいれる
  return targetPokemon[0].name === name1 && targetPokemon[0].name2 === name2;
};
