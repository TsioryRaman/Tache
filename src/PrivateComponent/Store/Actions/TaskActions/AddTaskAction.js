import {ADD_TASK , SET_TASK} from "../../TaskStore";

export const AddTasksAction = (tasks) => ({
    type:ADD_TASK,
    payload:tasks
})