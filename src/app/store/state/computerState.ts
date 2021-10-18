import { ComputerModel } from "../../models/ComputerModel";

export interface IComputerState {
  readonly computerIdState: string;
  readonly computerState: ComputerModel;
  readonly loading: boolean;
  readonly loaded: boolean;
}
export const initialComputerState: IComputerState = {
  computerIdState: null,
  computerState: null,
  loading: false,
  loaded: false
}