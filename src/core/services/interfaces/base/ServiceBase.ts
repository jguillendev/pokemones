import { ICreatePokemon } from "../ICreatePokemon";
import { ICreateResult } from "../ICreateResult";
import IDeleteResult from "../IDeleteResult";
import { IFindResult } from "../IFindResult";
import { ILoadResult } from "../ILoadResult";
import IUpdateResult from "../IUpdateResult";
import { IService } from "./IService";
import { IServiceSettings } from "./IServiceSettings";

abstract class ServiceBase implements IService {
    
    settings: IServiceSettings;
    constructor(settings: IServiceSettings){
        this.settings = settings;
    }
    
    
    abstract loadAsync():Promise<ILoadResult>;
    abstract findAsync(id:number):Promise<IFindResult>;
    abstract createAsync(payload:ICreatePokemon): Promise<ICreateResult>;
    abstract updateAsync(id:number, payload:ICreatePokemon): Promise<IUpdateResult>;
    abstract deleteAsync(id:number): Promise<IDeleteResult>;

}

export default ServiceBase;