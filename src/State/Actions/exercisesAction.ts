import ExercisesState from '../../Types/exercisesState'
import { ExercisesActionType } from '../Action Types/exercisesActionType'

type AddExerciseAction = {
    type: ExercisesActionType.Add,
    payload: ExercisesState['exercises'][0],
}

type RemoveExerciseAction = {
    type: ExercisesActionType.Remove,
    removeIndex: number,
}

export type ExercisesAction = AddExerciseAction | RemoveExerciseAction;