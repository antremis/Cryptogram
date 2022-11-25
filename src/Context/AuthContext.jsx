import { createContext, useContext, useState } from "react";

const AuthContext = createContext()

const AuthContextProvider = ({children}) => {
    const [user, setUser] = useState(null)

    return(
        <AuthContext.Provider value = {{user}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContextProvider
export const useAuthContext = () => {
    if(AuthContext) return useContext(AuthContext)
    else {
        console.log("Auth Context Not Available")
        return null
    }
};