import "./page-container.css";

export interface IPageContainer {
    children:any;
}

export default function PageContainer({children}:IPageContainer){
    return <main className="page-container">
        {children}
    </main>
}