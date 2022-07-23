import { pokemon } from "../../types/pokemon.type";

export default interface IUpdateResult {
    updated: boolean;
    data: pokemon;
}