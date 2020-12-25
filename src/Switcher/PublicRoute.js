import React from 'react';
import { Redirect, Switch,Route } from 'react-router';
import Connexion from "../Authentification/Connexion"

const PublicRoute = (props) => {
    return (
        <Switch>
            <Route render={()=><Connexion {...props}/>}  exact path="/connexion"/>
            <Redirect path="*" to="/connexion"/>
        </Switch>
    );
};

export default PublicRoute;