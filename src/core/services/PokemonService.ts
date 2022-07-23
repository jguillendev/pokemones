import { IServiceSettings } from "./interfaces/base/IServiceSettings";
import ServiceBase from "./interfaces/base/ServiceBase";
import { ICreatePokemon } from "./interfaces/ICreatePokemon";
import { ICreateResult } from "./interfaces/ICreateResult";
import IDeleteResult from "./interfaces/IDeleteResult";
import { IFindResult } from "./interfaces/IFindResult";
import { ILoadResult } from "./interfaces/ILoadResult";
import IUpdateResult from "./interfaces/IUpdateResult";

export class PokemonService extends ServiceBase {
    
    
    authorId: number;
    constructor(settings:IServiceSettings, authorId:number){ 
        super(settings);
        this.authorId = authorId;
    }


    loadAsync():Promise<ILoadResult> {

        const url = `${this.settings.host}/?idAuthor=${this.authorId}`;
        return fetch(url, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'            
            }
        })
        .then(result => result.json())
        .then(data => {
            return {
                items: data,
                success:true,
                status: 200
            }
        });
    }

    findAsync(id:number):Promise<IFindResult> {

        const url = `${this.settings.host}/${id}`;
        return fetch(url, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'            
            }
        })
        .then(result => result.json())
        .then(data => {
            return {
                exist: true,
                data: data,
                status: 200
            }
        });
    }
    
    createAsync(payload: ICreatePokemon): Promise<ICreateResult> {

        const url = `${this.settings.host}/?idAuthor=${this.authorId}`;
        return fetch(url, {
            method:'POST',
            headers: {
                'Content-Type': 'application/json'            
            },
            body: JSON.stringify(payload)
        })
        .then(result => result.json())
        .then(data => {
            return {
                data: data,
                status: 200,
                created: true
            } as ICreateResult
        })
    }

    updateAsync(id:number, payload: ICreatePokemon): Promise<IUpdateResult> {

        const url = `${this.settings.host}/${id}`;
        return fetch(url, {
            method:'PUT',
            headers: {
                'Content-Type': 'application/json'            
            },
            body: JSON.stringify(payload)
        })
        .then(result => result.json())
        .then(data => {
            console.log("updated:result: ", data);
            return {
                updated:true,
                data: {
                    ...data,
                    id: id,
                }
            } as IUpdateResult
        })
    }

    deleteAsync(id:number): Promise<IDeleteResult> {

        const url = `${this.settings.host}/${id}`;
        return fetch(url, {
            method:'DELETE',
            headers: {
                'Content-Type': 'application/json'            
            },
        })
        .then(result => result.json())
        .then(data => {
            return {
                deleted: true,
            } as IDeleteResult
        })
    }
}