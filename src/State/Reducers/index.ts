import { combineReducers } from "redux";
import exercisesReducer from './exercisesReducer'

const reducers = combineReducers({
    exercises: exercisesReducer
});

export default reducers;

export type State = ReturnType<typeof reducers>;