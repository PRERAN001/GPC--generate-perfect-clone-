import { useState, useEffect } from "react";
import { createContext } from "react";
export const Rabbitzcontext=createContext()
export const Rabbitzcontextprovider=(props)=>{
    const [user,setuser]=useState(()=>{
        try{
            const stored=localStorage.getItem("rabbitz_user")
            return stored ? JSON.parse(stored) : {name:"",prompt:"",result:""}
        } catch {
            return {name:"",prompt:"",result:""}
        }
    })

    useEffect(()=>{
        if(user?.name){
            localStorage.setItem("rabbitz_user",JSON.stringify(user))
        } else {
            localStorage.removeItem("rabbitz_user")
        }
    },[user])

    return (
        <Rabbitzcontext.Provider value={{user,setuser}}>
            {props.children}

        </Rabbitzcontext.Provider>
    )
}
