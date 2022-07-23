import React, { createRef, FormEvent, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { showForm } from "../../shared/states/showForm.state";
import InputRange from "../../components/forms/InputRange";
import { ICreatePokemon } from "../../core/services/interfaces/ICreatePokemon";
import { PokemonService } from "../../core/services/PokemonService";
import settings from "../../core/settings";
import { pokemonList, pokemonFilteredList } from "../../shared/states/pokemonList.state";
import { pokemon } from "../../core/types/pokemon.type";
import "./update-form.css";
import ActionButton from "../../components/forms/ActionButton";
import { CancelIcon } from "../../components/icons/CancelIcon";
import SubmitButton from "../../components/forms/SubmitButton";
import { SaveIcon } from "../../components/icons/SaveIcon";

export default function PokemonCreateForm(){

    const setForm = useSetRecoilState(showForm);
    const items = useRecoilValue<Array<pokemon>>(pokemonList);
    const updateList = useSetRecoilState(pokemonFilteredList);

    const [isValid, setIsValid] = useState(true);
    const nameRef = createRef<HTMLInputElement>();
    const urlRef = createRef<HTMLInputElement>();
    const attackRef = createRef<HTMLInputElement>();
    const defenseRef = createRef<HTMLInputElement>();

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
    
        const {success, data} = checkPayload();
        if(success === true){
            console.log("creating:data: ", data);
            const service = new PokemonService(settings, 1);
            const result = await service.createAsync(data);
            console.log("create:Result: ", result);
            if(result.created){
                //actaulizando la lista de items
                updateList([
                    ...items,
                    result.data,
                ]);
            }
        }
    }

    const checkPayload = ():{success:boolean, data:ICreatePokemon} =>{

        var haveErrors:boolean = false;
        const payload:ICreatePokemon = {
            idAuthor: 1,
            name: nameRef.current!.value,
            image: urlRef.current!.value,
            defense: defenseRef.current ? parseInt(defenseRef.current.value) : 0,
            attack: attackRef.current ? parseInt(attackRef.current.value) : 0,
            hp: 100,
            type: "custom"
        };

        if(payload.name === ""){
            nameRef.current?.classList.add('input-error');
            haveErrors = true;
        } 
        else
            nameRef.current?.classList.remove('input-error');
        
        if(payload.image === ""){
            urlRef.current?.classList.add('input-error');
            haveErrors = true;
        }
        else
            urlRef.current?.classList.remove('input-error');
        
        haveErrors ? setIsValid(false) : setIsValid(true);
        
        return {
            success: !haveErrors,
            data: payload,
        };

    }

    const onInputChange = (el:React.FormEvent<HTMLInputElement>) =>{
        console.log("onChange:name: ", el.currentTarget.value);
        checkPayload();
    }

    const onCancel = () =>{
        setForm('none');
    }

    return <div className="form-dialog">
        <p className="title">Nuevo Pokemon</p>
        <form onSubmit={(e)=>handleSubmit(e)}>
            <div className="form-fields">
                <div>
                    <div className="element">
                        <label className="text small">Nombre:</label>
                        <input type="text" placeholder="nombre" ref={nameRef} onChange={onInputChange}/>
                    </div>
                    <div className="element">
                        <label className="text small">Url:</label>
                        <input type="text" placeholder="url" ref={urlRef} onChange={onInputChange}/>
                    </div>
                </div>
                <div>
                    <InputRange 
                    ref={attackRef}
                    label="Ataque"
                    value={0}
                    min={0}
                    max={100}
                    />
                    <InputRange 
                    ref={defenseRef}
                    label="Defensa"
                    value={0}
                    min={0}
                    max={100}
                    />
                </div>
            </div>
            <div className="form-actions">
                <SubmitButton text="Guardar" disabled={!isValid}>
                    <SaveIcon />
                </SubmitButton>
                <div className="space-x"></div>
                <ActionButton text="Cancelar" handleClick={onCancel}>
                    <CancelIcon />
                </ActionButton>
            </div>
        </form>
    </div>
}