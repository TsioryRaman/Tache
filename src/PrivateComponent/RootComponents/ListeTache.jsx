import React  from 'react';
import {Grid} from "@material-ui/core"
import { ListTasksStore } from '../Component/ListTaskStore';
import Pagination from "@material-ui/lab/Pagination";

const ListeTache = () => {


    return (
        <div style={{"padding":"16px"}}>
            <Grid container spacing={1}>
                <ListTasksStore/>
            </Grid>
            <Pagination count={10}>

            </Pagination>
        </div>
            );
};

export default ListeTache;