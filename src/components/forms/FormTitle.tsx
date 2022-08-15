import React from "react";

export interface IFormTitle {
    title:string;
    subtitle?:string;
    className?:string;
}
export const FormTitle = ({title, subtitle, className="pb-2 sm:pb-3 md:pb-4"}:IFormTitle) =>{

    return <div className={className}>
        <h1 className="text-4xl text-gray-700 dark:text-gray-400 font-bold">{title}</h1>
        { subtitle && <h3 className="mt-1 text-xl text-gray-500 dark:text-gray-300 font-bold">{subtitle}</h3> }
    </div>
}