import ExercisesState from "../../Types/exercisesState"
import { ExercisesActionType } from "../Action Types/exercisesActionType"
import { ExercisesAction } from "../Actions/exercisesAction"
import { Dispatch } from "redux"

export const addExerciseAC = (exercise: ExercisesState['exercises'][0]) => {
    return (dispatch: Dispatch<ExercisesAction>) => {
        dispatch({
            type: ExercisesActionType.Add,
            payload: exercise,
        })
    }
}

export const removeExerciseAC = (index: number) => {
    return (dispatch: Dispatch<ExercisesAction>) => {
        dispatch({
            type: ExercisesActionType.Remove,
            removeIndex: index,
        })
    }
}