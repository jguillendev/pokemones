import "./action-button.css";

export interface IActionButton {
    children:any;
    text:string;
    disabled?:boolean;
    handleClick:()=> void;
}

export default function ActionButton({children, handleClick, text, disabled = false}:IActionButton){
    return <button disabled={disabled} className="action-button text white small" onClick={handleClick}>{ children } {text}</button>
}