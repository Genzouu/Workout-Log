import { combineReducers } from "redux";
import entriesReducer from "./entriesReducer";
import exercisesReducer from './exercisesReducer'
import logReducer from "./logReducer";

const reducers = combineReducers({
    exercises: exercisesReducer,
    log: logReducer,
    entries: entriesReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;