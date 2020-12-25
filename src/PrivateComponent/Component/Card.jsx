import {Card , CardHeader , Typography , CardContent  , makeStyles} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"
import Profil from "@material-ui/core/Avatar"
import React  from "react"
import {BASE_ENDPOINT_ASSETS} from "../../ENDPOINTS";
import Divider from "@material-ui/core/Divider";
import CardActions from "@material-ui/core/CardActions";
import IconButton from "@material-ui/core/IconButton";

import InfoIcon from "@material-ui/icons/Info"
import CardActionArea from "@material-ui/core/CardActionArea";

const useStyle = makeStyles(theme=>({
    root:{
      paddingTop:"8px",
      paddingBottom:"8px"
    },
    profil:{
        height:"50px",
        width:"50px",
        borderRadius:"50%"
    },
    card:{
        height:"100%",
    },
    CardActions:{
        marginTop:"100%"
    }
}))

const Avatar = ({personne,classes}) => {
    return <React.Fragment>{personne.filename ? <img className={classes.profil} alt={"profil"} src={BASE_ENDPOINT_ASSETS +personne.filename}/>:<Profil aria-label={personne.name} height={"50px"} width={"50px"}>{personne.name[0]}</Profil>}</React.Fragment>
}

export const Cards = ({item,loading}) => {

    const classes = useStyle()

    return <Card className={classes.card} square>
        <CardActionArea>

                {
                    item.personnel.length !== 0 ? item?.personnel.map(personne => <CardHeader classes={{root:classes.root}} key={personne.idPersonnel} avatar={
                            loading ? <Skeleton variant={"circle"} height={"50px"} width={"50px"}/> : <Avatar classes={classes} personne={personne}/>
                                }
                                title={loading ? <Skeleton variant={"text"}/> : <Typography>{personne.name}</Typography>
                                }
                                subheader={loading ?<Skeleton variant={"text"}/> : <Typography>{personne.email}</Typography> }
                    >
                    </CardHeader>

                    ) : <CardHeader
                            avatar={<Skeleton variant={"circle"} height={"50px"} width={"50px"} />}
                            title={"Aucun/aucune personelle pour le moment"}
                            subheader={"En cours de preparation"}
                    >

                    </CardHeader>
                }
                    <Divider/>
              
                    <CardContent>
                        {
                            loading ? <Skeleton variant={"rect"} height={"200px"} width={"200"}></Skeleton> : <Typography>{item.description}</Typography>
                        }
                    </CardContent>

        <CardActions className={classes.CardActions} disableSpacing>
                        <IconButton aria-label={"A propos"}>
                            <InfoIcon/>
                        </IconButton>
                    </CardActions>
        </CardActionArea>

    </Card>
}
