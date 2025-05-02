import { createContext, useState } from "react";

export const AppContext = createContext();

export const AppContextProvider = (props) =>{
  const [isUserRegistred,setIsUserRegistred] =  useState(localStorage.getItem('isRegistered') ? true : false );
  const [isUserLogin,setIsUserLogin] = useState(localStorage.getItem('isLoggedIn')?true : false);


  const value = {
    isUserLogin,
    setIsUserLogin,
    isUserRegistred,
    setIsUserRegistred
  };  
  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  )


}