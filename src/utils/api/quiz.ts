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
  const selector: Selector = [
    nextPokemon[0].name,
    randomPick(POKEMONS)?.name || "",
    randomPick(POKEMONS)?.name || "",
    randomPick(POKEMONS)?.name || "",
  ];

  return shuffleArray(selector);
};
