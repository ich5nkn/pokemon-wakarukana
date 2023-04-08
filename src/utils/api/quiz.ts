import { POKEMONS } from "@/constants/pokemons";
import { randomPick, shuffleArray } from "..";
import { OptionsType } from "@/pages/select";
import { Selector } from "@/types";

export const getNextPokemon = (
  answered: string[],
  options: OptionsType
): { no: string; hasSecondName: boolean } | undefined => {
  // TODO: option の値をつかって filtering を行う
  const filteredData = POKEMONS.filter(
    (pokemon) => !answered.some((answered) => answered === pokemon.no)
  );
  const pickPokemon = randomPick(filteredData);
  if (!pickPokemon) return;
  return { no: pickPokemon.no, hasSecondName: !!pickPokemon.name2 };
};

export const getSelector = (nextNo?: string): Selector | undefined => {
  if (!nextNo) return;
  const nextPokemon = POKEMONS.filter(({ no }) => no === nextNo);
  if (!nextPokemon.length) return;
  // TODO: ４択の候補を取得する際に、最初の１文字が同じなど、近い値を持ってこれるとなお良い
  const selector: Selector = [
    nextPokemon[0].name,
    randomPick(POKEMONS)?.name || "",
    randomPick(POKEMONS)?.name || "",
    randomPick(POKEMONS)?.name || "",
  ];

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
