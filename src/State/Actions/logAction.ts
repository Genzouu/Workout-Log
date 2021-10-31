import LogState from "../../Types/logState";
import { LogActionType } from "../Action Types/logActionType";

type AddEntryAction = {
    type: LogActionType.AddEntry,
    payload: LogState['entries'][0],
}

type RemoveEntryAction = {
    type: LogActionType.RemoveEntry,
    removeIndex: number,
}

export type LogAction = AddEntryAction | RemoveEntryAction;