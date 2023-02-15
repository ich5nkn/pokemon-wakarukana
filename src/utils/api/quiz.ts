import { POKEMONS } from "@/constants/pokemons";
import { randomPick } from "..";

export const getNo = (answered: string[]): string | undefined => {
  const filteredData = POKEMONS.filter(
    ({ id }) => !answered.some((answered) => answered === id)
  );
  return randomPick(filteredData)?.id;
};
