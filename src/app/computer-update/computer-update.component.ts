import { Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild } from '@angular/core'
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormGroupName, ValidatorFn, Validators } from '@angular/forms'
import { BehaviorSubject, Observable, Subject, Subscription } from 'rxjs'
import { MatDialog } from '@angular/material/dialog';
import { ErrorDialogComponent } from '../error-dialog/error-dialog.component'
import { Router } from '@angular/router'
import { ComputerModel } from '../models/ComputerModel';
import { ComputerService } from '../services/computer.service';
import { ComputerInfo } from '../valueObjects/computerInfo';
import { ConfirmUpdateComponent } from '../confirm-update/confirm-update.component';


export interface BooleanFn {
  (): boolean;
}

@Component({
  selector: 'app-computer-update',
  templateUrl: './computer-update.component.html',
  styleUrls: ['./computer-update.component.scss']
})
export class ComputerUpdateComponent implements OnInit, OnDestroy {
  @Output() goList: EventEmitter<number> = new EventEmitter<number>()
  computerInfo = new ComputerInfo()
  @Input() computer: ComputerModel;

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


  //isDisabledSave: boolean = true
 
  
  public showWebcam = true
  public allowCameraSwitch = true
  public multipleWebcamsAvailable = false
  public deviceId: string;
  public videoOptions: MediaTrackConstraints = {
    width: { ideal: 300 },
    height: { ideal: 400 }
  }    
  form: FormGroup
  mobileLocationForm: FormGroup
  selectedImage$ = new BehaviorSubject<string>("assets/NoImage.png")
  picture: string
  imageName
  srcResult
  imageAddress = "Test"
  files: any[]
  lblTakePicture: string = "Camera"
  daysFormValidation = false
  daysFormValidationSub: Subscription
  computerDateInfosSub: Subscription
  errorDialogSub : Subscription
  confirmDialogSub : Subscription
  resetSub : Subscription
  computerEditSub : Subscription

  constructor(private matDialog: MatDialog, public router: Router,
    private computerService: ComputerService, private fb: FormBuilder) {
    this.computerService.showSpinner.subscribe(x=> this.showSpinner = x);
    this.daysFormValidationSub = this.computerService.daysFormValidation
    .subscribe(x=> this.daysFormValidation = x) 
      
    this.errorDialogSub = this.computerService.confirmDialog
    .subscribe(error=>
      {
       console.log('Error = ', error)
       this.matDialog.open(ConfirmUpdateComponent, {data : error} )
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
    //this.setValue() 
    // this.computerEditSub = this.computerService.computerEdit$
    // .subscribe(x=>
    //   {
    //     console.log('computerEdit = ', x)
    //     this.computerEdit = x
    //     this.setValue(x)
    //   })    

  }
  

  public ngOnInit(): void {
    this.formGroupAssign()
    this.onChanges()  
    console.log('computer=', this.computer)
    this.setValue()
  } 
  public setValue(){
    this.form.get('ram').setValue(this.computer.Data.ram)  
    this.form.get('hdd').setValue(this.computer.Data.hdd)  
    this.form.get('ports').setValue(this.computer.Data.ports)  
    this.form.get('display').setValue(this.computer.Data.display)  
    this.form.get('weight').setValue(this.computer.Data.weight)  
    this.form.get('power').setValue(this.computer.Data.power)  
    this.form.get('cpu').setValue(this.computer.Data.cpu)  
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

  // getErrorCourtRef(){
  //   return this.courtRef.hasError('required') ? 'You must enter a value' :
  //   this.courtRef.hasError('email') ? 'Not a valid email' :
  //   this.courtRef.hasError('maxlength') ? 'Max length exceeded' :
  //       '';
  // }
 
  processFile(imageInput) {
  }
  onSubmit(form: FormGroupDirective) {
    this.showSpinner = true;    
    var computerView: ComputerModel =this.addComputerInfo(form.value)
    console.log("computer = ", computerView)
    this.computerService.updateComputer(computerView)
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
    this.daysFormValidationSub.unsubscribe()
    this.computerDateInfosSub.unsubscribe()
    this.resetSub.unsubscribe()
    this.computerEditSub.unsubscribe()
  }
}

