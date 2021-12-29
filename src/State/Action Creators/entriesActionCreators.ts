import { Dispatch } from "redux"
import LogState from "../../Types/logState"
import { EntriesActionType } from "../Action Types/entriesActionType"
import { EntriesAction } from "../Actions/entriesAction"


export const setEntriesAC = (entries: LogState['entries']) => {
    return (dispatch: Dispatch<EntriesAction>) => {
        dispatch({
            type: EntriesActionType.SetEntries,
            payload: entries,
        })
    }
}