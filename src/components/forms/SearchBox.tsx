import "./search-box.css";
import { SearchIcon } from "../icons/SearchIcon"

interface ISearchBox {
    onChange: (text:string) => void;
}
export const SearchBox = ({onChange}:ISearchBox) =>{

    const handleChange = (el:React.FormEvent<HTMLInputElement>) => {
        onChange(el.currentTarget.value);
    }

    return <div className="search-box">
        <SearchIcon />
        <input type="text" placeholder="Buscar" onChange={handleChange}/>
    </div>
}