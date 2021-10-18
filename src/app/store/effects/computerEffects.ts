import { Injectable } from '@angular/core'
import { Actions, createEffect, Effect, ofType} from '@ngrx/effects'
import { Observable, of } from 'rxjs'
import { switchMap, map, catchError } from 'rxjs/operators'
import * as computerActions from '../actions/computerActions'
import { EComputerActions } from '../actions/computerActions' 
import { Action } from '@ngrx/store'
import { ComputerApiService } from '../../apiServices/computer-api.service'
 
@Injectable()
export class computerEffects {
  constructor(private actions$: Actions,
    private ComputerApiService: ComputerApiService) {}

     
    loadComputer$: Observable<Action> = createEffect(()=>{
      return this.actions$.pipe(
        ofType<computerActions.LoadComputerDetails>(EComputerActions.LOAD_COMPUTER_DETAILS)
         ,switchMap(loadAction=> {
          console.log(loadAction.payload)
          return this.ComputerApiService.getComputer$(loadAction.payload.Data.appId)
          .pipe(
            map(computer => new computerActions.LoadComputerDetailsSuccess(computer))
            ,catchError(error => of(new computerActions.LoadComputerDetailsFail(error))),
          )
        }),    
      )}     
    )
}