import React, { createRef, FormEvent, useLayoutEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import ActionButton from "../../components/forms/ActionButton";
import InputRange from "../../components/forms/InputRange";
import SubmitButton from "../../components/forms/SubmitButton";
import { CancelIcon } from "../../components/icons/CancelIcon";
import { SaveIcon } from "../../components/icons/SaveIcon";
import { IFindResult } from "../../core/services/interfaces/IFindResult";
import { IUpdatePokemon } from "../../core/services/interfaces/IUpdatePokemon";
import { PokemonService } from "../../core/services/PokemonService";
import settings from "../../core/settings";
import { pokemon } from "../../core/types/pokemon.type";
import { pokemonFilteredList, pokemonList } from "../../shared/states/pokemonList.state";
import { showForm } from "../../shared/states/showForm.state";
import "./update-form.css";

interface IUpdatePokemonForm {
    id: number;
}

interface ICheckPayload {
    success:boolean; 
    data:IUpdatePokemon;
}

export default function PokemonUpdateForm({id}:IUpdatePokemonForm){

    const setForm = useSetRecoilState(showForm);
    
    const [isLoading, setIsLoading] = useState(true);
    const items = useRecoilValue<Array<pokemon>>(pokemonList);
    const updateList = useSetRecoilState(pokemonFilteredList);
    const [entity, setEntity] = useState<pokemon>();
    const [isValid, setIsValid] = useState(true);
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
       
        const {success, data} = checkPayload();
        if(success === true){

            const service = new PokemonService(settings, 1);
            const result = await service.updateAsync(id, data);
            if(result.updated){
                const distinctItems = items.filter(i => i.id !== id);
                const newList = [...distinctItems, result.data];
                updateList(newList);
            }
        }
    }

    const checkPayload = ():ICheckPayload => {

        var haveErrors:boolean = false;
        const payload:IUpdatePokemon = {
            idAuthor: 1,
            name: nameRef.current!.value,
            image: imageRef.current!.value,
            defense: defenseRef.current ? parseInt(defenseRef.current.value) : 0,
            attack: attackRef.current ? parseInt(attackRef.current.value) : 0,
            hp: 100,
            type: "custom"
        }

        if(payload.name === ""){
            nameRef.current?.classList.add('input-error');
            haveErrors = true;
        } 
        else
            nameRef.current?.classList.remove('input-error');
        
        if(payload.image === ""){
            imageRef.current?.classList.add('input-error');
            haveErrors = true;
        }
        else
            imageRef.current?.classList.remove('input-error');
        
        haveErrors ? setIsValid(false) : setIsValid(true);
        
        return {
            success: !haveErrors,
            data: payload,
        };

    }

    const onInputChange = (el:React.FormEvent<HTMLInputElement>) =>{
        checkPayload();
    }

    const onCancel = () =>{
        setForm('none');
    }

    if(isLoading) 
    return <div className="form-dialog">
        <p className="title">cargando...</p>
    </div>

    return <div className="form-dialog">
        <p className="title">Actualizar Pokemon</p>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-fields">
                <div>
                    <div className="element">
                        <label className="text small">Nombre:</label>
                        <input type="text" placeholder="nombre" ref={nameRef} onChange={onInputChange}/>
                    </div>
                    <div className="element">
                        <label className="text small">Url:</label>
                        <input type="text" placeholder="url" ref={imageRef} onChange={onInputChange}/>
                    </div>
                </div>
                <div>
                    <InputRange 
                    ref={attackRef}
                    label="Ataque"
                    value={entity!.attack}
                    min={0}
                    max={100}
                    />
                    <InputRange 
                    ref={defenseRef}
                    label="Defensa"
                    value={entity!.defense}
                    min={0}
                    max={100}
                    />
                </div>
            </div>
            <div className="form-actions">
                <SubmitButton text="Guardar">
                    <SaveIcon />
                </SubmitButton>
                <div className="space-x"/>
                <ActionButton text="Cancelar" handleClick={onCancel}>
                    <CancelIcon />
                </ActionButton>
            </div>
        </form>
    </div>
}