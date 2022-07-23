import type { pokemon } from "../../types/pokemon.type";

export interface ILoadResult {
    status: number;
    success: boolean;
    items: Array<pokemon>;
}