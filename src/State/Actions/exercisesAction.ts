import ExercisesState from '../../Types/exercisesState'
import { ExercisesActionType } from '../Action Types/exercisesActionType'

type AddAction = {
    type: ExercisesActionType.Add,
    payload: ExercisesState['exercises'][0],
}

type RemoveAction = {
    type: ExercisesActionType.Remove,
    removeIndex: number,
}

export type ExercisesAction = AddAction | RemoveAction