import React, { useLayoutEffect } from "react";
import { motion } from "framer-motion"
import { itemVariants, listVariants } from "@toolyfans/app-cores"
import { appActionError, IAppActionError } from "@toolyfans/app-logic";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { Location, useLocation } from "react-router-dom";

export interface IViewFormErrors {
    keep:boolean;
}
export const FormErrors = ({keep=false}:IViewFormErrors) =>{
    const location:Location = useLocation();
    const {haveError, messages} = useRecoilValue<IAppActionError>(appActionError);
    const updateError = useSetRecoilState<IAppActionError>(appActionError);

    useLayoutEffect(()=>{
        if(keep === false)
        updateError({
            haveError:false,
        });
    },[keep]);

    return  <motion.div className='tf-colors-warning py-2 md:py-3'
    variants={listVariants}
    initial="hidden"
    animate="visible">
    { haveError && messages && messages.map((message:string, index:number) =>{
        return <motion.p key={index} variants={itemVariants}><span className="tf-colors-white">*</span> {message}</motion.p>
    })}
    </motion.div>

}