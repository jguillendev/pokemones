import { createRef, FormEvent, useLayoutEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { IFindResult } from "../../core/services/interfaces/IFindResult";
import { PokemonService } from "../../core/services/PokemonService";
import settings from "../../core/settings";
import { pokemon } from "../../core/types/pokemon.type";
import { pokemonFilteredList, pokemonList } from "../../shared/states/pokemonList.state";
import { showForm } from "../../shared/states/showForm.state";
import "./update-form.css";
import ActionButton from "../../components/forms/ActionButton";
import { CancelIcon } from "../../components/icons/CancelIcon";
import SubmitButton from "../../components/forms/SubmitButton";
import { RemoveIcon } from "../../components/icons/RemoveIcon";

interface IDeletePokemonForm {
    id: number;
}


export default function PokemonDeleteForm({id}:IDeletePokemonForm){

    const setForm = useSetRecoilState(showForm);
    
    const [isLoading, setIsLoading] = useState(true);
    const items = useRecoilValue<Array<pokemon>>(pokemonList);
    const updateList = useSetRecoilState(pokemonFilteredList);
    const [entity, setEntity] = useState<pokemon>();
    const nameRef = createRef<HTMLInputElement>();
    const imageRef = createRef<HTMLInputElement>();
    const attackRef = createRef<HTMLInputElement>();
    const defenseRef = createRef<HTMLInputElement>();


    useLayoutEffect(()=>{
        const loadPokemon = async () =>{
            setIsLoading(true);
            new PokemonService(settings, 1).findAsync(id).then((result:IFindResult)=>{
                setIsLoading(false);
                if(result.exist)
                    setEntity(result.data);
            });
        }
        loadPokemon();
    },[id]);

    useLayoutEffect(()=>{
        if(entity && entity.name && nameRef.current)
            nameRef.current.value = entity.name;
        
        if(entity && entity.image && imageRef.current)
            imageRef.current.value = entity.image;

        if(entity && entity.attack && attackRef.current)
            attackRef.current.value = entity.attack.toString();
    
        if(entity && entity.defense && defenseRef.current)
            defenseRef.current.value = entity.defense.toString();

    },[entity, nameRef, imageRef, attackRef, defenseRef]);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();

        const service = new PokemonService(settings, 1);
        const result = await service.deleteAsync(id);
        if(result.deleted){
           const distinctItems = items.filter(i => i.id !== id);
           updateList(distinctItems);
        }
    
    }

    const onCancel = () =>{
        setForm('none');
    }

    if(isLoading) 
    return <div className="form-dialog">
        <p className="title">cargando...</p>
    </div>

    return <div className="form-dialog">
        <p className="title">Eliminar Pokemon</p>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-fields">
                <div>
                    <div className="element">
                        <label className="text small">ID:</label>
                        <p>{entity!.id}</p>
                    </div>
                    <div className="element">
                        <label className="text small">Nombre:</label>
                        <p>{entity!.name}</p>
                    </div>
                </div>
                <div>
                    <div className="element">
                        <label className="text small">Ataque:</label>
                        <p>{entity!.attack}</p>
                    </div>
                    <div className="element">
                        <label className="text small">Defensa:</label>
                        <p>{entity!.defense}</p>
                    </div>
                </div>
                <img className="thumbnail" src={entity!.image} alt={entity!.name}/>
            </div>
            <div className="form-actions">
                <SubmitButton text="Eliminar">
                    <RemoveIcon />
                </SubmitButton>
                <div className="space-x"></div>
                <ActionButton text="Cancelar" handleClick={onCancel}>
                    <CancelIcon />
                </ActionButton>
            </div>
        </form>
    </div>
}