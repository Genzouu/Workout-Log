import { Dispatch } from 'redux'
import LogState from '../../Types/logState'
import { LogActionType } from '../Action Types/logActionType'
import { LogAction } from '../Actions/logAction'

export const addEntryAC = (entry: LogState['entries'][0]) => {
    return (dispatch: Dispatch<LogAction>) => {
        dispatch({
            type: LogActionType.AddEntry,
            payload: entry,
        })
    }
}

export const removeEntryAC = (removeIndex: number) => {
    return (dispatch: Dispatch<LogAction>) => {
        dispatch({
            type: LogActionType.RemoveEntry,
            removeIndex: removeIndex,
        })
    }
}