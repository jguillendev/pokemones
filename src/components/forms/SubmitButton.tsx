import "./action-button.css";

export interface ISubmitButton {
    children:any;
    text:string;
    disabled?:boolean;
}

export default function SubmitButton({children, text, disabled = false}:ISubmitButton){
    
    const className = disabled 
    ? "action-button text white small disabled"
    : "action-button text white small";

    return <button type="submit" disabled={disabled} className={className}>{ children } {text}</button>
}