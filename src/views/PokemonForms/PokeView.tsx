import { useLayoutEffect, useState } from "react";
import { IFindResult } from "../../core/services/interfaces/IFindResult";
import { PokemonService } from "../../core/services/PokemonService";
import settings from "../../core/settings";
import { pokemon } from "../../core/types/pokemon.type";
import "./update-form.css";

interface IPokeView {
    id: number;
}

const PokeView = ({id}:IPokeView) =>{

    const [isLoading, setIsLoading] = useState(true);
    const [entity, setEntity] = useState<pokemon>();
    
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
    
    if(isLoading) 
    return <div className="form-dialog">
        <p className="title">cargando pokeview...</p>
    </div>

    return <div className="form-dialog full">
          <img className="thumbnail" src={entity!.image} alt={entity!.name}/>
    </div>
}

export default PokeView