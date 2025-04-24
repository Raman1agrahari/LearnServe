import { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));

    const storeTokenInLs = (serverToken) => {
        return localStorage.setItem("token",serverToken);
    };

    const isLoggedIn = !!token;
    console.log("isloggeding",isLoggedIn);

    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

  return (<AuthContext.Provider value={{ storeTokenInLs, LogoutUser,isLoggedIn}}>
    {children}
  </AuthContext.Provider>
  );
} 

export const useAuth = () => {
    const authContextValue = useContext(AuthContext);
    if(!authContextValue){
        throw new Error("useAuth used outside of the provider");
    }

    return  authContextValue;
}

