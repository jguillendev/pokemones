import { useRecoilValue, useSetRecoilState } from "recoil";
import AppBar from "../components/AppBar/AppBar";
import PageContainer from "../components/PageContainer/PageContainer";
import PageTitle from "../components/PageTitle";
import Toolbar from "../components/ToolBar";
import PokemonCreateForm from "../views/PokemonForms/PokemonCreateForm";
import PokemonTable from "../views/PokemonTable/PokemonTable";
import "./pages.css";
import PokemonUpdateForm from "../views/PokemonForms/PokemonUpdateForm";
import { pokemonSelected } from "../shared/states/pokemonSelected.state";
import { showForm } from "../shared/states/showForm.state";
import { useEffect, useLayoutEffect } from "react";
import { PokemonService } from "../core/services/PokemonService";
import settings from "../core/settings";
import { ILoadResult } from "../core/services/interfaces/ILoadResult";
import { pokemonList } from "../shared/states/pokemonList.state";
import PokemonDeleteForm from "../views/PokemonForms/PokemonDeleteForm";

export default function AdminPage(){

    const displayForm = useRecoilValue(showForm);
    const selectedPokemonId = useRecoilValue(pokemonSelected);
    const setList = useSetRecoilState(pokemonList);
    console.log("adminPage.data");
    //tratando de usar diferentes tecnicas, solo para la demo :)
    //pre-fetching
    useLayoutEffect(()=>{
        const loadPokemones = async () =>{
            const service = new PokemonService(settings, 1);
            console.log("main:useLayoutEffect:loadPokemones");
            const result = await service.loadAsync();
            if(result.success)
                setList(result.items);
        }
        loadPokemones();
    });

    return <div className="page">
        <AppBar />
        <PageContainer>
            <PageTitle title="Listado de Pokemon" />
            <Toolbar />
            <PokemonTable />
            { displayForm === 'create' && <PokemonCreateForm /> }
            { displayForm === 'update' && <PokemonUpdateForm id={selectedPokemonId} /> }
            { displayForm === 'delete' && <PokemonDeleteForm id={selectedPokemonId} /> }
        </PageContainer>
    </div>
}
