import { useState } from "react";
import { createContext } from "react";
export const Rabbitzcontext=createContext()
export const Rabbitzcontextprovider=(props)=>{
    const [user,setuser]=useState({
        name:"",
        prompt:"",
        result:""
    })
    return (
        <Rabbitzcontext.Provider value={{user,setuser}}>
            {props.children}

        </Rabbitzcontext.Provider>
    )
}
