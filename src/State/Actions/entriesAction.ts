import LogState from "../../Types/logState";
import { EntriesActionType } from "../Action Types/entriesActionType";

type SetEntriesAction = {
    type: EntriesActionType.SetEntries,
    payload: LogState['entries'],
}

export type EntriesAction = SetEntriesAction;