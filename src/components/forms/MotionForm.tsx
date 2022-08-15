import React, { FormEvent } from "react";
import { motion } from "framer-motion";
import { FadeInAppear } from "@toolyfans/app-cores";

export interface IMotionForm {
    children:any,
    full?:boolean;
    onSubmit:(event:FormEvent<HTMLFormElement>)=> void;
}
export const MotionForm = ({
    full=true,
    children,
    onSubmit
}:IMotionForm) =>{

    const classes = `${full ? "grow items-center justify-center" : "flex-none" } max-w-sm pt-2 sm:pt-4 sm:pt-6`;
    return <motion.form 
    key="one"
    initial="hidden"
    animate="visible"
    exit="exit"
    variants={FadeInAppear}
    onSubmit={onSubmit} 
    className={classes}>
    {children}
    </motion.form>
}