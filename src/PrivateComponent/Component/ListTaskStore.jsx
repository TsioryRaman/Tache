import React , {useEffect , useState} from "react";
import {connect , useDispatch} from "react-redux";
import {GetTaskAction} from "../Store/Actions/TaskActions/GetTaskAction";
import {Grid , makeStyles} from "@material-ui/core";
import {Link} from "react-router-dom";
import {Cards} from "./Card";
import {TaskSelector} from "../Store/Selector/TaskSelector";

const useStyle = makeStyles(theme =>({


}))

export const ListData = ({Data}) => {

    const classes = useStyle()

    const [loading,setLoading] = useState(false)
    const dispatch = useDispatch()

    useEffect( async () => {
        try{
            setLoading(true)
            await dispatch(GetTaskAction())
            setLoading(false)
        }catch (e) {
            setLoading(false)
        }
    },[])

    return <React.Fragment>
        {
            Data.map(item => <Grid item className={classes.grid} xs={10} md={4} key={item.idTache}>
                    <Link style={{"textDecoration":"none"}}  to={`/listetache/${item.idTache}`}>
                        <Cards loading={loading} key={item.idTache}  item={item}/>
                    </Link>
                </Grid>
            )
        }
    </React.Fragment>
}


export const ListTasksStore = connect(
    (state) =>({
        Data:TaskSelector(state)
    }),
    null
)(ListData)