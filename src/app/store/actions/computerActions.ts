import { Action } from '@ngrx/store';
import { ComputerModel } from '../../models/ComputerModel';
export enum EComputerActions {
    AddComputerId   = '[Computer] AddComputerId',
    LOAD_COMPUTER_DETAILS = '[Computer] Load Computer Details',
    LOAD_COMPUTER_DETAILS_FAIL = '[Computer]  Load Computer Details Fail',
    LOAD_COMPUTER_DETAILS_SUCCESS = '[Computer]  Load Computer Details Success'
}
// Computer implementation 

export class AddComputerId implements Action {
    readonly type = EComputerActions.AddComputerId
    constructor(public payload: string) {}
}
export class AddComputerDetails implements Action {
    readonly type = EComputerActions.AddComputerId
    constructor(public payload: ComputerModel) {}
}
export class LoadComputerDetails implements Action {
    readonly type = EComputerActions.LOAD_COMPUTER_DETAILS
    constructor(public payload: ComputerModel) {}
}
export class LoadComputerDetailsFail implements Action {
    readonly type = EComputerActions.LOAD_COMPUTER_DETAILS_FAIL
    constructor(public payload: any) {}
}
export class LoadComputerDetailsSuccess implements Action {
    readonly type = EComputerActions.LOAD_COMPUTER_DETAILS_SUCCESS
    constructor(public payload: ComputerModel) {}
}
export type computerActions =   AddComputerId | 
                                  AddComputerDetails |
                                  LoadComputerDetails |
                                  LoadComputerDetailsFail |
                                  LoadComputerDetailsSuccess

