import React , {useCallback , useMemo , useState} from 'react';
import {Switch,Route,Redirect} from "react-router"
import Acceuil from "../PrivateComponent/RootComponents/Acceuil"
import {isConnected} from "./IsStillConnected"
import Navbar from "../BaseComponent/Navbar"
import {TacheStore} from "../PrivateComponent/Store/Data/MainStore"
import {createMuiTheme , makeStyles , useMediaQuery} from "@material-ui/core";
import {Provider} from 'react-redux';
import ListeTache from '../PrivateComponent/RootComponents/ListeTache';
import TacheSimple from '../PrivateComponent/RootComponents/TacheSimple';
import {ThemeProvider} from "@material-ui/core/styles";

const useStyle = makeStyles(theme => ({
    root:{
        [theme.breakpoints.up("sm")]:{
            marginTop:"70px",
            marginLeft:"75px"
        },
        marginTop:"60px",
        marginLeft:"65px"
    }
}))

const PrivateRoute = () => {

    const classes = useStyle()
    const [Selected,setSelected] = useState('light')
    const switchTheme = useMediaQuery(`(prefers-color-scheme: ${Selected})`)

    const handleChange = useCallback(()=>{
        setSelected(t => t==="dark" ? "light":"dark")
    },[])

    const theme = useMemo(()=>
        createMuiTheme({
            palette:{
                type: switchTheme ? 'dark' : 'light',
            }

        })
    ,[switchTheme])

    return (<React.Fragment>
            <ThemeProvider theme={theme}>
                <Navbar themes={handleChange}/>
                        <div className={classes.root}>
                            <Switch>
                                <Redirect exact path={["/","/connexion"]} to={"/acceuil"}/>
                                <ProtectedRoute component={Acceuil} exact path={"/acceuil"}/>
                                <Provider store={TacheStore}>
                                    <ProtectedRoute component={TacheSimple} exact path={"/listetache/:id"}/>
                                    <ProtectedRoute component={ListeTache} exact path={"/listetache"}/>
                                </Provider>
                                <Redirect exact path="*" to={"/"}/>
                            </Switch>
                        </div>
            </ThemeProvider>

        </React.Fragment>
    );
};

const ProtectedRoute = ({component: Component, ...rest}) =>{
    //{..res} Lé exacte pathn lé Route
    return (
        <Route {...rest} render={
            (props) => {
                if (isConnected()){
                    return <Component {...props}/>
                }else {
                    return <Redirect to={"/connexion"}/>
                }

            }
        } />
    )
}

export default PrivateRoute;