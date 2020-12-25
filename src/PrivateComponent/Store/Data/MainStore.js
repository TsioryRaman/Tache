import {createStore , combineReducers , applyMiddleware} from "redux";
import {TaskReducer} from "../TaskStore";
import {composeWithDevTools} from "redux-devtools-extension";
import {PersonnelStore} from "../PersonnelStore";
import thunk from "redux-thunk";
import {PaginationReducer} from "../PaginationStore";

export const TacheStore = createStore(combineReducers({
    task:TaskReducer,
    pagination:PaginationReducer,
    personnel:PersonnelStore
}),composeWithDevTools(
    applyMiddleware(thunk)
))