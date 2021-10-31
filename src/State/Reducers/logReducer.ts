import { Reducer } from "redux";
import LogState from "../../Types/logState";
import { LogActionType } from "../Action Types/logActionType";
import { LogAction } from "../Actions/logAction"

const initialState: LogState['entries'] = [];

const logReducer: Reducer<LogState['entries'], LogAction> = (state = initialState, action) => {
    switch (action.type) {
        case LogActionType.AddEntry:
            return state.concat(action.payload);
        case LogActionType.RemoveEntry:
            let newState = state;
            newState.splice(action.removeIndex, 1);
            
            return [...newState];
        default:
            return state;
    }
}

export default logReducer;