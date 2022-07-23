import { atom, selector } from "recoil";
import { pokemon } from "../../core/types/pokemon.type";
import { pokemonSelected } from "./pokemonSelected.state";
import { showForm } from "./showForm.state";

export const pokemonList = atom<Array<pokemon>>({
    key:'pokemon-list-items',
    default: []
});

export const pokemonQuery = atom<string>({
    key:'pokemon-query',
    default:''
});

export const pokemonFilteredList = selector({
    key: 'pokemon-filtered-list',
    get: ({get}) => {
        const items = get(pokemonList);
        const queryName = get(pokemonQuery);
        if(queryName !== "")
            return items.filter((item:pokemon) => item.name.toLowerCase().includes(queryName.toLowerCase()));
        else
            return items;
    },
    set: ({set}, newValue) => {
        set(pokemonList, newValue);
        set(pokemonQuery, "");
        set(pokemonSelected, 0);
        set(showForm, 'hone');
    },
});
