import { IComputerState, initialComputerState } from '../state/computerState';
import { computerActions, EComputerActions } from '../actions/computerActions';

export const computerReducer = (state = initialComputerState,
    action: computerActions): IComputerState => {
    switch(action.type) {       
        case EComputerActions.LOAD_COMPUTER_DETAILS:
            console.log(action.payload)
            return {
                        ...state,
                        computerState: action.payload,
                        loading: true,
                        loaded: false
                   };    
        case EComputerActions.LOAD_COMPUTER_DETAILS_SUCCESS:
            console.log(action.payload)
            return {
                        ...state,
                        computerState: action.payload,
                        loading: false,
                        loaded: true
                    };  
        case EComputerActions.LOAD_COMPUTER_DETAILS_SUCCESS:
            console.log(action.payload)
            return {
                        ...state,
                        loading: false,
                        loaded: false
                    };                                                          
        default:
            return state;
    }
};
// Section 2
//export function locationReducer(state: reducerModel = initialState, action: Actions.Actions) {

    // Section 3
