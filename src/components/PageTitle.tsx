import "./page-title.css";

export type IPageTitle = {
    title:string;
}

export default function PageTitle({title}:IPageTitle){
    return <header className="page-title text small">{title}</header>
}