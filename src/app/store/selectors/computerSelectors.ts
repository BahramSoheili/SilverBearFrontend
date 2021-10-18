import { createSelector } from '@ngrx/store';
import { IAppState } from '../state/appState';
import { IComputerState } from '../state/computerState';

const computerState = (state :IAppState) => state.computers;
export const selectComputer = createSelector(
    computerState,
    (state : IComputerState) => state.computerState
);


