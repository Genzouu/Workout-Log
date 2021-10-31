import { combineReducers } from "redux";
import exercisesReducer from './exercisesReducer'
import logReducer from "./logReducer";

const reducers = combineReducers({
    exercises: exercisesReducer,
    workoutEntries: logReducer,
});

export default reducers;

export type State = ReturnType<typeof reducers>;