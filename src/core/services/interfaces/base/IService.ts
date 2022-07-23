import { ICreatePokemon } from "../ICreatePokemon";
import { ICreateResult } from "../ICreateResult";
import IDeleteResult from "../IDeleteResult";
import { ILoadResult } from "../ILoadResult";
import IUpdateResult from "../IUpdateResult";

export interface IService {

    loadAsync(): Promise<ILoadResult>;
    loadAsync():Promise<ILoadResult>;
    createAsync(payload:ICreatePokemon): Promise<ICreateResult>;
    updateAsync(id:number, payload:ICreatePokemon): Promise<IUpdateResult>;
    deleteAsync(id:number): Promise<IDeleteResult>;
    
}