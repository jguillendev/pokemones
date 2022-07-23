import { DeleteIcon } from "../../components/icons/DeleteIcon";
import { EditIcon } from "../../components/icons/EditIcon";
import type { pokemon } from "../../core/types/pokemon.type";
import "./pokemon-table-item.css";

interface IPokemonTableItemProps {
    data: pokemon;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
}

export default function PokemonTableItem({data, onEdit, onDelete}:IPokemonTableItemProps){

    const onEditHandler = () =>{
        onEdit(data.id);
    }

    const onDeleteHandler = () =>{
        onDelete(data.id);
    }

    return <tr className="text small">
        <td>{data.name}</td>
        <td>
            <img className="photo thumbnail" src={data.image} alt={data.name} />
        </td>
        <td>{data.attack}</td>
        <td>{data.defense}</td>
        <td>
            <div className="actions">
            <EditIcon onClick={onEditHandler}/>
            <DeleteIcon onClick={onDeleteHandler}/>
            </div>
        </td>
    </tr>
}