import type { pokemon } from "../../core/types/pokemon.type";
import { useHttpRequest } from "../../shared/hooks/useHttpRequest";
import { IRequest } from "../../shared/interfaces/http.interfaces";

import PokemonTableItem from "./PokemonTableItem";
import "./pokemon-table.css";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { showForm } from "../../shared/states/showForm.state";
import { pokemonSelected } from "../../shared/states/pokemonSelected.state";
import { pokemonFilteredList } from "../../shared/states/pokemonList.state";


export default function PokemonTable(){

    const setForm = useSetRecoilState(showForm);
    const setPokemonId = useSetRecoilState(pokemonSelected); 
    const data = useRecoilValue<Array<pokemon>>(pokemonFilteredList);

    const editHandler = (id:number) =>{
        setForm('update');
        setPokemonId(id);
    }

    const deleteHandler = (id:number) => {
        setForm('delete');
        setPokemonId(id);
    }

    const onImageHandler = (id:number) => {
        setForm('image');
        setPokemonId(id);
    }

    return <table cellSpacing={0}>
        <thead>
            <tr className="text black small bold">
                <th>Nombre</th>
                <th>Imagen</th>
                <th>Ataque</th>
                <th>Defensa</th>
                <th>Acciones</th>
            </tr>
        </thead>
        <tbody>
            {
                data && data.length >= 1 && data.map((item:pokemon) => {
                    return <PokemonTableItem key={item.id} data={item} onEdit={editHandler} 
                    onImageSelect={onImageHandler}
                    onDelete={deleteHandler}/>
                })
            }
        </tbody>
    </table>
}
