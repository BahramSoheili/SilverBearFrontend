import { RouterReducerState } from '@ngrx/router-store'
import { IComputerState, initialComputerState } from './computerState';


export interface IAppState {
    router?:RouterReducerState;    
    computers: IComputerState;
}
export const initialAppState: IAppState = {
    computers: initialComputerState,
}
export function getInitialState(): IAppState {
    return initialAppState;
}