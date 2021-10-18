import { Component, ViewChild, OnDestroy, EventEmitter, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { AgGridAngular } from 'ag-grid-angular';
import * as computerActions from '../store/actions/computerActions'
import { ComputerService } from 'src/app/services/computer.service';
import { Store } from '@ngrx/store';
import { ComputerModel } from '../models/ComputerModel';
import { ComputerApiService } from '../apiServices/computer-api.service';
import { IComputerState } from '../store/state/computerState';

@Component({
  selector: 'app-computer-list',
  templateUrl: './computer-list.component.html',
  styleUrls: ['./computer-list.component.scss']
})
export class ComputerListComponent implements OnDestroy {

  @ViewChild('agGrid', {static: true}) agGrid: AgGridAngular;
  rowDataSubscription: Subscription;
  //rowData :[];
  columnDefs;
  rowId = ""
  rowSelection = "single"
  activeMediaQuery = ''
  private gridApi
  private gridColumnApi
  watcher : Subscription
  @Output() onDetails = new EventEmitter<void>()
  @Output() onCreate = new EventEmitter<void>()
  expandedElement: ComputerModel | null
  showButton = true;  

  constructor(private computerService: ComputerService, 
    private computerApiService: ComputerApiService,
    private computerStore: Store<IComputerState>) {
    console.log('constructor');
    this.loadDesktopContent();
  };

  onGridReady(params) {
    this.gridApi = params.api
    this.gridColumnApi = params.columnApi
    this.rowDataSubscription = this.computerApiService.getListAll$().subscribe(x=> {
      this.gridApi.setRowData(x.map(y=>y))
      console.log('computers list = ', x)
   });
    // this.computerService.computersFull$.pipe(takeUntil(this.onDestroy)).subscribe((x : any)=> 
    // {
    //   this.gridApi.setRowData(x);
    // });
  };
  mouseOverIndex = -1
  public onMouseOver(index) {
    // console.log(index)
    this.mouseOverIndex = index
  };


  loadDesktopContent() {
    this.columnDefs = [
      {headerName: 'ID', field: 'data.appId', sortable: true, filter: true, width:70 },    
      {headerName: 'RAM', field: 'data.RAM', sortable: true, filter: true, width:80 },    
      {headerName: 'HDD', field: 'data.HDD', sortable: true, filter: true, width:93 },
      {headerName: 'PORTS', field: 'data.PORTS', sortable: true, filter: true, width:130 },
      {headerName: 'DISPLAY', field: 'data.DISPLAY', sortable: true, filter: true, width:130 },
      {headerName: 'WEIGHT', field: 'data.WEIGHT', sortable: true, filter: true,  width:100 },
      {headerName: 'POWER', field: 'data.POWER', sortable: true, filter: true,  width:100 },
      {headerName: 'CPU', field: 'data.CPU', sortable: true, filter: true,  width:100 }
    ];
  };
  doFilter(filterValue: string){
    //this.rowData.filter = filterValue.trim().toLowerCase()
  };
  showDetails(row) {
    this.showButton = true
    console.log(row)
    this.onDetails.emit()
  };
  showCreate() {
    this.showButton = false
    console.log('Create has clicked')
    this.onCreate.emit()
  };
  onSelectionChanged() {
    console.log('goDetails clicked');    

    var selectedRows = this.gridApi.getSelectedRows()
    var selectedRowsString = "";
    selectedRows.map((selectedRow, index) => {
      index !== 0 ? selectedRowsString += ", " : selectedRowsString = "";
      selectedRowsString += selectedRow._id;
    });
    this.rowId = selectedRowsString
    console.log("computer = ", selectedRows[0]);
    //this.store.dispatch(new computerActions.AddcomputerId(this.rowId))
    this.computerStore.dispatch(new computerActions.LoadComputerDetails(selectedRows[0]))
   };

  ngOnDestroy() {
    //this.onDestroy.next();
    this.rowDataSubscription.unsubscribe();
    //this.watcher.unsubscribe();
  }; 
}

