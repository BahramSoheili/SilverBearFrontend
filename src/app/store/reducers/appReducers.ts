import { ActionReducerMap } from '@ngrx/store'
import { routerReducer } from '@ngrx/router-store'
import { IAppState } from '../state/appState'
import { computerReducer } from './computerReducer'
export const appReducers : ActionReducerMap<IAppState, any> = {
    router: routerReducer,  
    computers: computerReducer,
};
