import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormGroupName, ValidatorFn, Validators } from '@angular/forms'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'
import { ComputerService } from '../services/computer.service'
import { ComputerModel } from '../models/ComputerModel'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'
import { Router } from '@angular/router'
import { ComputerInfo } from '../valueObjects/computerInfo'
import { ConfirmCreateComponent } from '../confirm-create/confirm-create.component'


export interface BooleanFn {
  (): boolean;
}

@Component({
  selector: 'app-computer-create',
  templateUrl: './computer-create.component.html',
  styleUrls: ['./computer-create.component.scss']
})
export class ComputerCreateComponent implements OnInit, OnDestroy {

  @Output() goList: EventEmitter<number> = new EventEmitter<number>()
  showSpinner: boolean
 
  get ram() {
    return this.form.get('ram');
  }
  get hdd() {
    return this.form.get('hdd');
  }
  get ports() {
    return this.form.get('ports');
  }  
  get display() {
    return this.form.get('display');
  }  
  get weight() {
    return this.form.get("weight");
  }  
  get power() {
    return this.form.get("power");
  }
  get cpu() {
    return this.form.get("cpu");
  }  
  get description() {
    return this.form.get("description");
  } 
  form: FormGroup
  srcResult
  errorDialogSub : Subscription
  confirmDialogSub : Subscription
  resetSub : Subscription

  constructor(private matDialog: MatDialog, public router: Router,
    private computerService: ComputerService, private fb: FormBuilder) {
    this.computerService.showSpinner.subscribe(x=> this.showSpinner = x);     
    this.errorDialogSub = this.computerService.confirmDialog
    .subscribe(error=>
      {
       console.log('Error = ', error)
       this.matDialog.open(ConfirmCreateComponent, {data : error} )
      })      
    this.confirmDialogSub = this.computerService.errorDialog
    .subscribe(x=>
      {
        this.matDialog.open(ErrorDialogComponent, {data: x, disableClose: true, hasBackdrop: false})
      })   
    this.resetSub = this.computerService.reset
    .subscribe(x=>
      {
        this.form.reset
        this.router.navigate(['/home'])
      })        
  }
  public ngOnInit(): void {  
    this.formGroupAssign()
    this.onChanges()  
  } 

  findInvalidControls() {
    const invalid = [];
    const controls = this.form.controls;
    for (const name in controls) {
        if (controls[name].invalid) {
            invalid.push(name);
        }
    }
    console.log('invalid = ', invalid)
    return invalid;
  }  

  KioskGroupChangeAction(kioskGroup) {
    console.log('kioskGroupName = ' + kioskGroup.kioskGroupName);
  }
  BailTypeChangeAction(BailType) {
    console.log('bailType = ' + BailType.BailTypeName);
  }  
 
  conditionalValidator(predicate: BooleanFn, validator: ValidatorFn,
     errorNamespace?: string): ValidatorFn {
    return (formControl => {
    if (!formControl.parent) {
      return null;
    }
    let error = null;
    if (predicate()) {
      error = validator(formControl);
    }
    if (errorNamespace && error) {
      const customError = {};
      customError[errorNamespace] = error;
      error = customError
    }
    return error;
    })
  }
  formGroupAssign() {
    this.form = this.fb.group({
      ram: ['', [Validators.required, Validators.minLength(3)]],
      hdd: ['', [Validators.required, Validators.minLength(3)]],
      ports: ['', [Validators.required, Validators.minLength(3)]],
      display: ['', [Validators.required, Validators.minLength(3)]],
      weight: ['', [Validators.required, Validators.minLength(3)]],
      power: ['', [Validators.required, Validators.minLength(3)]],
      cpu: ['', [Validators.required, Validators.minLength(3)]],
      description: ['', Validators.maxLength(256)]
    })
  }
  onChanges(): void {
  } 

  onSubmit(form: FormGroupDirective) {
    this.showSpinner = true;    
    var computerView: ComputerModel =this.addComputerInfo(form.value)
    console.log("computer = ", computerView)
    this.computerService.createComputer(computerView)
    this.form.reset

  }   
  addComputerInfo(value: any) : ComputerModel {
    var computerView = new ComputerModel
    var computerInfo: ComputerInfo = {
      appId:0,
      ram : value.ram, 
      hdd : value.hdd, 
      ports : value.ports, 
      display : value.display, 
      weight : value.weight, 
      power : value.power,      
      cpu : value.cpu     
    }    
    console.log("ComputerInfo = ", computerInfo)  
    computerView.Data = computerInfo
    computerView.description = value.description  
    return computerView
  } 
  ngOnDestroy(): void {
    this.resetSub.unsubscribe()
  }
}

