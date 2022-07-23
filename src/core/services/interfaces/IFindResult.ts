import type { pokemon } from "../../types/pokemon.type";

export interface IFindResult {
    exist: boolean;
    status: number;
    data: pokemon;
}