import { useLayoutEffect, useState } from "react";
import { IHttpError, IRequest } from "../interfaces/http.interfaces";

export type SendRequest = {
    payload: any;
}
export type HookHttpRequestResult<T> = {
    isLoading:boolean;
    data:T | undefined,
    error:IHttpError | undefined;
    send: (request:SendRequest)=> void;
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const useHttpRequest = <R,T>({url, auto=true }:IRequest): HookHttpRequestResult<T> => {

    const [isLoading, setIsLoading] = useState<boolean>(auto);
    const [data, setData] = useState<T>();
    const [error, setError] = useState<IHttpError>();
    
    const onData = async (result:any) => {
        const data =  await result.json();
        if(result.status !== 200)
        onError(data);
        else
        setData(data);
        setIsLoading(false);
    }

    const onError = (result:any)=>{

        setError({
            status: result.status,
            statusText: result.statusText,
            ex:result.ex
        });
        setIsLoading(false);
    }

    const send = (request:SendRequest) => {
        setIsLoading(true);
        return fetch(url).then(onData)
        .catch(onError);
    }

    useLayoutEffect(()=>{

        if(auto === false) return;
        fetch(url)
        .then(onData)
        .catch(onError);

    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[url, auto]);

    return { isLoading, data, error, send }
}