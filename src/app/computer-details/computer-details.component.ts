import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Observable, Subscription }from 'rxjs';
import { DomSanitizer } from '@angular/platform-browser';
import { ConfirmDeletingComponent } from '../confirm-deleting/confirm-deleting.component';
import { ComputerService } from '../services/computer.service';
import { ComputerModel } from '../models/ComputerModel';
import { select, Store } from '@ngrx/store';
import { selectComputer } from '../store/selectors/computerSelectors';
import { ComputerApiService } from '../apiServices/computer-api.service';
@Component({
  selector: 'app-computer-details',
  templateUrl: './computer-details.component.html',
  styleUrls: ['./computer-details.component.scss']
})
export class ComputerDetailsComponent
 {
  computerDetails$: Observable<ComputerModel> = this.store
  .pipe(select(selectComputer));
  sub: Subscription
  computer : ComputerModel
  rowDataSubscription: Subscription 
  private gridApi
  private gridColumnApi
  constructor(private computerService: ComputerService, 
    private store: Store,
    private computerApiService: ComputerApiService,
    private matDialog: MatDialog, public router: Router,) { 
    this.sub = this.computerDetails$.subscribe(x=> {
      console.log('computerDetails$ = ', x)
      this.computer = x })
  }   
  deleteComputer(){
    console.log('deleting')
    this.matDialog.open(ConfirmDeletingComponent, {data: {'message': 'Are you sure o delete?'}, disableClose: true, hasBackdrop: false})
  }
  editComputer(){
    this.computerService.computerEdit$.next(this.computer)
    //this.computerDetails$ = null
  }
}