import React, { createContext, useEffect, useState } from "react";
import {BrowserRouter as Router} from "react-router-dom";
import { GET_SESSION, USER_SESSION } from "../Authentification/ServiceToken";
import {isConnected} from "./IsStillConnected";
import Private from "./PrivateRoute"
import Public from "./PublicRoute"

export const UserContext = createContext({user:null})

const Switcher = () => {

    const [user,setUser] = useState({});

    const onToggle = (value) => {
        setUser(value)
    }

    useEffect(()=>{ 
        isConnected() && setUser(GET_SESSION(USER_SESSION))
    },[])

    return <Router>
                {
                    isConnected() ?  <UserContext.Provider value={user}>
                                        <Private />
                                     </UserContext.Provider>
                                  : <Public onToggle={onToggle}/>
                } 
            </Router>

}


export default  Switcher;
