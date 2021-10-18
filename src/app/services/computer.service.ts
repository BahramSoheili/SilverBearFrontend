import { Injectable, OnDestroy } from '@angular/core'
import { BehaviorSubject, ReplaySubject, Subject, Subscription, throwError } from 'rxjs'
import { select, Store } from '@ngrx/store'
import { IAppState } from '../store/state/appState'
import { ComputerApiService } from '../apiServices/computer-api.service'
import { ComputerModel } from '../models/ComputerModel'
import { _ } from 'ag-grid-community'
import { selectComputer } from '../store/selectors/computerSelectors'
import { ComputerInfo } from '../valueObjects/computerInfo'

@Injectable({
  providedIn: 'root'
})
export class ComputerService implements OnDestroy {

  sub1: Subscription
  sub2: Subscription
  sub3: Subscription
  sub4: Subscription
  computerEdit$ = new Subject<ComputerModel>()
  showSpinner = new Subject<boolean>()
  computerDetails$ =  this.store.pipe(select(selectComputer))
  computerPhoto$ = new ReplaySubject<boolean>()
  webcamImage$ = new Subject<string>()
  errorDialog = new Subject<string>()
  confirmDialog = new Subject<string>()
  computers: ComputerModel[]
  computersGetAll = new BehaviorSubject<ComputerModel[]>([])
  computersGetAll$ = this.computersGetAll.asObservable()
  daysFormValidation = new Subject<boolean>()
  newComputerCreated = new Subject<boolean>()
  reset = new Subject<boolean>()

  dialogRef: void

  constructor(private computerApiService: ComputerApiService,
    private store: Store<IAppState>) {
      // this.sub1 = this.computerApiService.getAll$().subscribe(x=>
      //   {
      //     this.computers = x;
      //     this.computersGetAll.next(x);
      //   })
      // this.sub2 = this.computerDetails$
      // .subscribe(x=> console.log('computerDetails$ = ', x))   
  }
  createComputer(computer: ComputerModel)
  {
    this.showSpinner.next(true)
    this.sub3 = this.computerApiService.add$(computer).subscribe((x:any)=>   {
      this.newComputerCreated.next(true)
      console.log('New Computer Added = ', x)
      this.showSpinner.next(false)
      if(x == null){
        this.dialogRef = this.confirmDialog.next('Computer successfully has been added')
        this.reset.next(true)
      } 
      else if(x.Status == 'error'){
        this.dialogRef = this.errorDialog.next(x.message)
      }       
      else {
        this.dialogRef = this.errorDialog.next('Failed to add a new Computer')
      }    
    })
    //this.dialogRef.afterClosed().subscribe()
  } 
  updateComputer(computer: ComputerModel)
  {
    this.showSpinner.next(true)
    this.sub3 = this.computerApiService.update$(computer).subscribe((x:any)=>   {
      this.newComputerCreated.next(true)
      console.log('Computer updated = ', x)
      this.showSpinner.next(false)
      if(x == null){
        this.dialogRef = this.confirmDialog.next('Computer successfully has been Updated')
        this.reset.next(true)
      } 
      else if(x.Status == 'error'){
        this.dialogRef = this.errorDialog.next(x.message)
      }       
      else {
        this.dialogRef = this.errorDialog.next('Failed to Update the Computer')
      }    
    })
    //this.dialogRef.afterClosed().subscribe()
  } 
  ngOnDestroy(): void {
   this.sub1.unsubscribe
   this.sub2.unsubscribe
   this.sub3.unsubscribe
   this.sub4.unsubscribe
  } 
}



