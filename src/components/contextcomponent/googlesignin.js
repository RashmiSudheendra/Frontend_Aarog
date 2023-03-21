import React from 'react'
import jwtDecode from 'jwt-decode';
import { useEffect, useState} from 'react';
export const SignInContext = React.createContext()


function Googlesignin({children}) {

    const [user, setUser] = useState({});
  
  function handleCallbackResponse(response){
    console.log("Encoded JWT ID token:" + response.credential)
    var userObject = jwtDecode(response.credential);
    console.table(userObject);
    setUser(userObject);
  }

  useEffect(()=>{
    /*global google*/
      google.accounts.id.initialize({
        client_id: "49538352252-98fab0tj827sl5enk4frf4nh9q1kiaqb.apps.googleusercontent.com",
        callback: handleCallbackResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("signindiv"),
        {theme: "outline", size: "large"}
      )
  },[]);

  return <>
  <SignInContext.Provider value={{user, setUser}}>
      {children}
  </SignInContext.Provider>
</>
}

export default Googlesignin
