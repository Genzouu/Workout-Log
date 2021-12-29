import { Reducer } from "redux";
import LogState from "../../Types/logState";
import { EntriesActionType } from "../Action Types/entriesActionType";
import { EntriesAction } from "../Actions/entriesAction";

const initialState: LogState['entries'] = [];

const entriesReducer: Reducer<LogState['entries'], EntriesAction> = (state = initialState, action) => {
    switch (action.type) {
        case EntriesActionType.SetEntries:
            let newState = [...action.payload];
            return newState;
        default:
            return state;
    }
}

export default entriesReducer;