import { atom } from "recoil";

export const pokemonSelected = atom<number>({
    key:'pokemon-selected-id',
    default: 0
});