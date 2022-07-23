import React from "react";
import { useState } from "react";

export interface IInputRange {
    label: string;
    ref: React.LegacyRef<HTMLInputElement> | undefined;
    min: number;
    max: number;
    value: number;
}

const InputRange = React.forwardRef<HTMLInputElement, IInputRange>(({label, value, min, max}:IInputRange, ref)=> {

    const [val, setVal] = useState<number>(value);
    const handleChange = (el:React.FormEvent<HTMLInputElement>) => setVal(parseInt(el.currentTarget.value));
    

    return <div className="element">
        <label className="text small">{label}:</label>
        <input ref={ref} placeholder="attack range" onChange={handleChange} type="range" min={min} max={max} className="slider"/>
        <span className="text small">{val}</span>
    </div>

});

export default InputRange;
