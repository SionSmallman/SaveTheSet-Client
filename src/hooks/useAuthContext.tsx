// Hook used by components to get current Auth context
// Use this hook if a component needs to know if a user is logged in

import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

export const useAuthContext = () => {
    const context = useContext(AuthContext)

    if (!context) {
        throw Error('useAuthContext must be used inside an AuthContextProvider')
    }
    
    return context
}