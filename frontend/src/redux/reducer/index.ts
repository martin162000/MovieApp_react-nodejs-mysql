import { combineReducers } from "redux";
//import { selectedMovie } from "../actions/actions";
import {setReducer} from "./reducer"
import user from "./user"
import changed from "./changed"
import historyMovies from "./historyMovies";
import historyUser from "./historyUser";

const reducers = combineReducers({
    allMovies: setReducer,
    userInfo: user,
    changeState: changed,
    historyMovies: historyMovies,
    historyUser: historyUser 
})

export default reducers;