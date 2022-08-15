import React from "react";

export interface IFormsInputDate {
    label: string;
    placeholder:string;
    propertyName:string;
    help?:string;
    disabled?:boolean;
    responsive?:boolean;
    margin?:string;
    onFocusOut?:(event:any)=>void;
    onChangeHandler?:(event:any)=>void;
}

const InputDate = ({
    label,
    placeholder,
    propertyName,
    disabled,
    responsive = true,
    margin="mb-6",
    onChangeHandler,
    onFocusOut,
    help
}:IFormsInputDate, ref:any) => {

    const classes = responsive ? "md:flex"+margin : margin;
    const classInput = responsive ? "md:w-2/3 mt-2" : "mt-2 md:w-full";

    const classLabel = responsive ? "select-none md:w-1/3" : "select-none md:w-full";
    const classLabelText = `block text-gray-600 dark:text-gray-200 font-semibold ${responsive ? "md:text-right pr-4" : "" } mb-1 md:mb-0`;

    return (
        <div className={classes}>
            <div className={classLabel}>
               <label className={classLabelText}>{label}</label>
            </div>
            <div className={classInput}>
            <input ref={ref} data-property={propertyName} className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-sm w-full py-1 sm:py-2 px-1 sm:px-2 md:px-4 text-gray-700 leading-tight 
            focus:outline-none hover:outline-none active:outline-none focus:bg-white focus:border-yellow-500"
            type="text"
            disabled={disabled ?? false}
            placeholder={placeholder}
            onMouseOut={onFocusOut}
            onChange={onChangeHandler}/>
            </div>
            { help && <p className="text-blue-400 text-sm">{help}</p>}
        </div>
    );
}

export const FormInputDate =  React.forwardRef(InputDate);