import { POKEMONS } from "@/constants/pokemons";
import { randomPick } from "..";

export const getNo = (answered: string[]): string | undefined => {
  const filteredData = POKEMONS.filter(
    ({ no }) => !answered.some((answered) => answered === no)
  );
  return randomPick(filteredData)?.no;
};
