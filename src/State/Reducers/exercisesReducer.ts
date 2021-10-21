import { Reducer } from "redux";
import ExercisesState from "../../Types/exercisesState"
import { ExercisesActionType } from "../Action Types/exercisesActionType";
import { ExercisesAction } from '../Actions/exercisesAction'

const initialState: ExercisesState['exercises'] = [];

const reducer: Reducer<ExercisesState['exercises'], ExercisesAction> = (state = initialState, action) => {
    switch (action.type) {
        case ExercisesActionType.Add:
            return state.concat(action.payload);
        case ExercisesActionType.Remove:
            let newState = state;
            newState.splice(action.removeIndex, 1);

            return [...newState];
        default:
            return state;
    }
}

export default reducer;