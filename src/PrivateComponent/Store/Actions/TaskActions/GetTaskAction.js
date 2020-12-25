import {GET_TASKS_URL} from "../../../../ENDPOINTS";
import {SET_TASK} from "../../TaskStore";
import {GET} from "../../../../Ressource/Get";

export const GetTaskAction = () => async (dispatch,getState) => {
    try{
        if(!getState().task.length){
            const response = await GET(GET_TASKS_URL)
            if(response){
                dispatch({
                    type:SET_TASK,
                    data: response.tache
                })
            }
        }

    }catch (e) {
        console.log(e)
    }

}