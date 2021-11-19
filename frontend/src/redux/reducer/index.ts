import { combineReducers } from "redux";
//import { selectedMovie } from "../actions/actions";
import {setReducer} from "./reducer"
import user from "./user"
import changed from "./changed"

const reducers = combineReducers({
    allMovies: setReducer,
    userInfo: user,
    changeState: changed
})

export default reducers;