import React, { useContext, useEffect } from "react";
import Typography from "@material-ui/core/Typography";
import {UserContext} from "../../Switcher/main"
import {Cards} from "../Component/Card";

const Acceuil = () => {

    const user = useContext(UserContext)

    // Set Title
    useEffect(()=>{
        document.title = "acceuil | admin"
    },[])

    return <React.Fragment>
                <Typography variant={"h1"}>
                    Teste
                </Typography>
           </React.Fragment>
    
}

export default Acceuil;
