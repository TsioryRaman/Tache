/** Import */
import React, {useRef, useState,useCallback } from "react"
import Grid from "@material-ui/core/Grid"
import TextField from "@material-ui/core/TextField/TextField"
import Button from "@material-ui/core/Button"
import Typography from "@material-ui/core/Typography"
import makeStyles from "@material-ui/core/styles/makeStyles"
import DomainIcon from '@material-ui/icons/Domain'
import SendIcon from '@material-ui/icons/Send';
import Paper from "@material-ui/core/Paper"
import {SET_SESSION,TOKEN_SESSION,USER_SESSION} from "./ServiceToken";
import {GridLoader} from "react-spinners";
import { useEffect } from "react"
// Constant.
const ENDPOINT_LOGIN     = "https://localhost:5001/api/login"
const ENDPOINT_USER_DATA = "https://localhost:5001/api/getUser"
const METHOD_POST        = "POST"
const METHOD_GET         = "GET"
const MOUSE_MOVE         = "mousemove"
const MOUSE_LEAVE        = "mouseleave"
const MOUSE_ENTER        = "mouseenter"
/** Styles */
const useStyles = makeStyles(theme=>({
    container:{
        padding:20,
        backgroundColor:"rgba(0,0,0,0.8)"
    },
    paper:{
        padding:"45px 20px"
    },
    itemField:{
        margin:"15px 0"
    },
    buttonField:{
        margin:"15px 0"
    },
    root:{
        minHeight:"100vh",
        overflow:"hidden",
    },
    Form:{
        position:"relative",
        transformStyle:"preserve-3D",
        transform:"none",
        borderRadius:"4px",
        boxShadow:"0px 2px 1px -1px rgba(0,0,0,0.2), 0px 3px 1px 7px rgba(0,0,0,0.14), 6px 1px 3px 6px rgba(0,0,0,0.12)"
    },
    info:{
        fontSize:10,
        color:"rgba(0,0,0,0.3)",
        textAlign:"center",
    },
    infoHeader:{
        margin: "10px -20px",
        borderLeft: "2px solid"
    },
    load:{
        display:"flex",
        position:"absolute",
        zIndex:"3",
        top:0,
        right:0,
        left:0,
        bottom:0,
        animation:`$effect 1700ms ${theme.transitions.easing.sharp}`, 
        background:theme.palette.secondary.light,
        borderRadius:"3px",
        justifyContent:"center",
        alignItems:"center",
        transition: "0.6s ease"
    },
    "@keyframes effect":{
        "0%":{
            left:"100%",
            bottom:"100%",
            borderBottomLeft:10
        },
        "100%":{
            bottom:0,
            left:0
        }
    },
    


}))

// Hook form
const useChange = (initial="") => {
    const [value,setValue] = useState(initial)
    const onChange = (e) => {
        setValue(v=>e.target.value)
    }
    return [value,onChange]
}

/** Main Component */
const Main = React.memo((props) => {

    const parent    = useRef()
    const root      = useRef()
    const header    = useRef()
    const connexion = useRef()
    // Animation.
    const Animation = useCallback(() => {
        document.body.style.overflow = "hidden"
        var xAxis
        var yAxis
        var xRootAxis
        var yRootAxis

        parent.current.addEventListener(MOUSE_MOVE,(e)=>{
            if(!xRootAxis && !yRootAxis){
                xAxis = (window.innerWidth / 2 - e.pageX) /15;
                yAxis = (window.innerHeight / 2 - e.pageY) /15;
                    
                root.current.style.transition     = `none`
                header.current.style.transform    = `translateZ(40px)`
                connexion.current.style.transform = `translateZ(30px)`
                // root.current.style.transform      = "translateZ(20px)"

                root.current.style.transform      = `rotateX(${yAxis}deg) rotatey(${xAxis}deg) `
            }else{
                header.current.style.transition   = `0.6s ease`
                connexion.current.style.transition = `0.6s ease`
                connexion.current.style.transform = `translateZ(0)`
                root.current.style.transform = `rotateX(0deg) rotatey(0deg) `
                header.current.style.transform = `translateZ(0)`
            }
            
        })
        parent.current.addEventListener(MOUSE_LEAVE,()=>{
            header.current.style.transition = `0.6s ease`
            connexion.current.style.transition = `0.6s ease`
            connexion.current.style.transform = `translateZ(0)`
            root.current.style.transform = `rotateX(0deg) rotatey(0deg) `
            header.current.style.transform = `translateZ(0)`
        })

        root.current.addEventListener(MOUSE_MOVE,(e)=>{
            xRootAxis = e.pageX
            yRootAxis = e.pageY
        })
        root.current.addEventListener(MOUSE_ENTER,()=>{
            root.current.style.transition = `0.6s ease`
        })
        root.current.addEventListener(MOUSE_LEAVE,()=>{
            xRootAxis = 0
            yRootAxis = 0
        })
         
    },[])

    useEffect(()=>{
        document.title = "connexion | admin"
        Animation()
        return () => {
            document.body.style.overflow = "auto"
        }
    })

    const classes = useStyles();

    return <Grid ref={parent} className={`${classes.root} root`}    container alignContent={"center"} justify={"center"} direction={"row"}>
            <Grid item className={classes.Form} ref={root} xs={10} md={3}>
                <Paper className={classes.paper}>
                    <Typography  variant={"h4"} ref={header} color={"secondary"}>
                        <DomainIcon color={"inherit"}/>Tache
                    </Typography>
                    <Typography ref={connexion} className={classes.infoHeader} align={"center"} variant={"h5"} color={"textSecondary"}>
                        Connexion
                    </Typography>
                    <Form {...props} />
                </Paper>
           
            </Grid>
    </Grid>

})


const Form = ({onToggle}) => {

    const classes = useStyles();

    const [username, setUsername] = useChange("")
    const [password, setPassword] = useChange("")
    const [loading,setLoading] = useState(false)

    const onSubmit = async (e) => {
        setLoading(true)
        e.preventDefault()

        try{
            const response = await RequestLogin(ENDPOINT_LOGIN,{username:username,password:password})
            if(response.token){
                SET_SESSION(TOKEN_SESSION,response.token)
                try{
                    const token = "Bearer "+response.token
                    const user = await RequestData(ENDPOINT_USER_DATA,token)
                    if(user){
                        SET_SESSION(USER_SESSION,user.user)
                        onToggle(user.user)
                    }
                }catch(e){
                    setLoading(l=>!l)
                }
            }
        }catch (e) {
            setLoading(l=>!l)
        }
    }

    return <form onSubmit={(e) => onSubmit(e)}>
        <Grid container direction={"column"}>
            <Grid item className={classes.itemField} xs={12}>
            <TextField autoComplete={"off"} color={"secondary"} fullWidth required={true} size={"small"} type={"text"} name={"username"} label={"Nom d'utilisateur"} variant={"outlined"}
                       onChange={setUsername} value={username}/>
            </Grid>
            <Grid item className={classes.itemField} xs={12}>
            <TextField color={"secondary"} fullWidth required={true} size={"small"} type={"password"} name={"password"} label={"Mot de passes"} variant={"outlined"}
                       onChange={setPassword} value={password}/>
            </Grid>
            <Button startIcon={<SendIcon/>} disabled={loading} className={classes.buttonField} type={"submit"} variant={"contained"} color={"secondary"}>Se connecter</Button>
            <Typography className={classes.info} variant={"subtitle1"}>
                Contacter l'administrateur
            </Typography>
        </Grid>
        <div className={loading ? classes.load : ""}>
            <GridLoader color={"white"}/>
        </div>

    </form>
}
// Requested URL...
    const RequestLogin = async (ENDPOINT,DATA) => {
        try{
            const request = await fetch(ENDPOINT,{
                method:METHOD_POST,
                body:JSON.stringify(DATA),
                headers:{
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json",
                }
            })
            const response = await request.json()
            console.log(response)
            return response
        }catch (e) {
            return e
        }
    }

    const RequestData = async (ENDPOINT,TOKEN) => {
        try{
            const request = await fetch(ENDPOINT,{
                method:METHOD_GET,
                headers:{
                    "Access-Control-Allow-Origin": "*",
                    "Content-type": "application/json",
                    "Authorization": TOKEN
                }
            })
            const response = await request.json()
            return response
        }catch(e){
            console.log(e)
        }
    }
export default Main;
