import { createContext, useContext, useEffect, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({children}) => {
    const [token, setToken] = useState(localStorage.getItem("token"));
    const [user, setUser] = useState("");
    const [isLoading , setIsLoading] = useState(true);
    const [services,setServices] = useState([]);
    const authorizationToken = `Bearer ${token}`;
    

    const storeTokenInLs = (serverToken) => {
        setToken(serverToken);
        return localStorage.setItem("token",serverToken);
    };

    const isLoggedIn = !!token;
    console.log("isloggeding",isLoggedIn);
 
    const LogoutUser = () => {
        setToken("");
        return localStorage.removeItem("token");
    };

    const userAuthentication = async () => {
        try{
            setIsLoading(true);
            const response = await fetch(`${import.meta.env.VITE_API}/api/auth/user`,{
                method:"GET",
                headers:{
                    Authorization: authorizationToken,
                },
            });

            if(response.ok){
              const data = await response.json();
              console.log("user data",data.userData);
              setUser(data.userData);
              setIsLoading(false);

            }else{
                console.log("Error fetching user data");
                setIsLoading(false);
            }


        }catch(error){
           console.log(error);
           setIsLoading(false);
        }
    };

    const getServices = async () => {
        try{
            const response = await fetch(`${import.meta.env.VITE_API}/api/data/service`,{
                method:"GET",
            });

            if(response.ok){
                const data = await response.json();
                console.log("service",data.msg);
                setServices(data.msg);
            }
        }catch(error){
            console.log(`services frontend error ${error}`);
        }
    }

    useEffect(()=>{
      getServices();
      userAuthentication();
    }, [])

  return (<AuthContext.Provider value={{ isLoggedIn, storeTokenInLs, LogoutUser, user ,services,authorizationToken,isLoading }}>
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

