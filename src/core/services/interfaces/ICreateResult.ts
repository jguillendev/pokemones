import type { pokemon } from "../../types/pokemon.type";

export interface ICreateResult {
    created: boolean;
    status: number;
    data: pokemon;
}