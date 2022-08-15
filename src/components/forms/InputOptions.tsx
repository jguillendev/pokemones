import React, { useEffect, useState } from "react";


export interface IFormOption {
    key:string;
    value:string;
}

export interface IFormsInputOptions {
    label?: string;
    placeholder:string;
    propertyName:string;
    options:Array<IFormOption>;
    optionDefault: IFormOption;
    selected?: IFormOption;
    text?:string;
    disabled?:boolean;
    responsive?:boolean;
    margin?:string;
    help?:string;
    onFocusOut?:(event:any)=>void;
    onOptionChange?:(option:IFormOption)=>void;
}

const FormOptions = ({selected, optionDefault, label, placeholder, propertyName, disabled, help, margin="mb-6", responsive = true, onOptionChange, options}:IFormsInputOptions, ref:any) => {

  const classes = responsive ? "md:flex"+margin : margin;
    const classLabel = responsive ? "select-none md:w-1/3" : "select-none md:w-full";
    const classInput = responsive ? "md:w-2/3 mt-2" : "mt-2 md:w-full";
    const classLabelText = `block text-gray-600 dark:text-gray-200 font-semibold ${responsive ? "md:text-right pr-4" : "" } mb-1 md:mb-0`;

    const [selectedOption, setSelectedOption] = useState<IFormOption>(selected ?? optionDefault);
    
    useEffect(()=>{
      setSelectedOption(selected ?? optionDefault)
    },[selected]);

    const onSelect = (e:any) => {
      const option = options.find(f=>f.value == e.target.value);
      if(option && onOptionChange)
      onOptionChange({
        key:option.key,
        value:option.value
      });

      if (option && ref && ref.current){
        ref.current.key = option.key;
        ref.current.value = option.value;
        setSelectedOption(option);
      }
    }
  
    return(
      <div className={classes}>
      {
        label && <div className={classLabel}>
            <label className={classLabelText}>{label}</label>
        </div>
      }
      <div className={classInput}>
          <select  
          ref={ref} 
          data-property={propertyName}
          placeholder={placeholder}
          disabled={disabled ?? false}
          className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-sm w-full py-1 sm:py-2 px-1 sm:px-2 md:px-4 text-gray-700 leading-tight 
              focus:outline-none focus:bg-white focus:border-yellow-500"
            value={selectedOption.value}
            onChange={e => onSelect(e)}>
            {options.map(o => (
              <option key={o.key} value={o.value}>{o.value}</option>
            ))}
          </select>
        </div>
        { help && <p className="text-blue-400 text-sm">{help}</p>}
      </div>
    );
}

export const FormInputOptions =  React.forwardRef(FormOptions);