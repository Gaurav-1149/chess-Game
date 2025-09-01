import { createContext, useContext, useState } from "react";


const userContext = createContext<any>(null)

export function UserProvider({children}:any){

    const [authUser, setAuthUser] = useState<any>(null)

    return (
        <userContext.Provider value={{authUser, setAuthUser}}>
            {children}
        </userContext.Provider>
    )

}


export function useUser() {
    const context = useContext(userContext)

    if(!context){
        throw new Error("useUser must be used within a UserProvider")
    }
    return context;
}