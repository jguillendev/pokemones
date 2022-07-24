import { useSetRecoilState } from "recoil";
import SearchBox from './forms/SearchBox';
import { AddIcon } from './icons/AddIcon';
import ActionButton from './forms/ActionButton';
import './toolbar.css';
import { showForm } from '../shared/states/showForm.state';
import { pokemonQuery } from "../shared/states/pokemonList.state";

export default function Toolbar(){

    const setForm = useSetRecoilState(showForm);
    const setQuery = useSetRecoilState(pokemonQuery);

    const onClick = () => { 
        setForm('create');
    }
    const handleChange = (queryName:string) =>{
        setQuery(queryName);
    }

    return <div className='toolbar'>
        <SearchBox onChange={handleChange}/>
        <ActionButton text="Nuevo" handleClick={onClick}>
            <AddIcon />
        </ActionButton>
    </div>
}