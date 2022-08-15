import React from "react";

export interface IFormsInputDecimal {
    label?: string;
    placeholder:string;
    propertyName:string;
    help?:string;
    disabled?:boolean;
    responsive?:boolean;
    margin?:string;
    onFocusOut?:(event:any)=>void;
    onChangeHandler?:(event:any)=>void;
}

const InputDecimal = ({
    label,
    placeholder,
    propertyName,
    disabled,
    responsive = true,
    margin="mb-6",
    onChangeHandler,
    onFocusOut,
    help
}:IFormsInputDecimal, ref:any) => {

    const classes = responsive ? "md:flex"+margin : margin;
    const classLabel = responsive ? "select-none md:w-1/3" : "select-none md:w-full";
    const classInput = responsive ? "md:w-2/3 mt-2" : "mt-2 md:w-full";
    const classLabelText = `block text-gray-600 dark:text-gray-200 font-semibold ${responsive ? "md:text-right pr-4" : "" } mb-1 md:mb-0`;
    
    const onDecimalKeyPress = (event:any) => {
        debugger
        const keyCode = event.keyCode || event.which;
        if(keyCode !== 13){
          const keyValue = String.fromCharCode(keyCode);
          var isValid = /[0-9.]/.test(keyValue) === false;
          if(isValid){
            event.preventDefault();
          }
        }  
    }

    const onDecimalChange = (e:any) => {

        const splits = e.target.value.split(".");
    
        if(e.target.value.startsWith("0")){
          ref.current.value = e.target.value.slice(0, -1);
        }
        //si en ese momento tiene dos puntos, quita uno
        if(splits.length >2){
          ref.current.value = e.target.value.slice(0, -1);
        }
        //si tiene punto y ya lleva 3 decimales
        else if(splits.length === 2 && splits[1].length === 3){
          //quitar el tercer decimal
          ref.current.value = e.target.value.slice(0, -1);
        }
        else if(e.target.validity.valid)
          if (ref && ref.current)
            ref.current.value = e.target.value;
          if(onChangeHandler)
          onChangeHandler(e.target.value);
      }
    

    return (
        <div className={classes}>
            {
              label && <div className={classLabel}>
                  <label className={classLabelText}>{label}</label>
              </div>
            }
            <div className={classInput}>
              <input 
              ref={ref} 
              data-property={propertyName} 
              className="bg-gray-200 appearance-none border-2 border-gray-200 rounded-sm w-full py-1 sm:py-2 px-1 sm:px-2 md:px-4 text-gray-700 leading-tight 
              focus:outline-none hover:outline-none active:outline-none focus:bg-white focus:border-yellow-500"
              type="text"
              disabled={disabled ?? false}
              placeholder={placeholder}
              onMouseOut={onFocusOut}
              onKeyPress={e=>onDecimalKeyPress(e)} 
              onChange={e=>onDecimalChange(e)}/>
            </div>
            { help && <p className="text-blue-400 text-sm">{help}</p>}
        </div>
    );
}

export const FormInputDecimal =  React.forwardRef(InputDecimal);