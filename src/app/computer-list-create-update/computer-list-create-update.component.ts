import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ComputerModel } from '../models/ComputerModel';
import { ComputerService } from '../services/computer.service';

@Component({
  selector: 'app-computer-list-create-update',
  templateUrl: './computer-list-create-update.component.html',
  styleUrls: ['./computer-list-create-update.component.scss']
})
export class ComputerListCreateUpdateComponent implements OnInit, OnDestroy {
  IsComputerEdit : boolean = false
  editComputer : ComputerModel
  selected = new FormControl(0)
  sub : Subscription
  constructor(private computerService: ComputerService) {
    this.sub = this.computerService.computerEdit$.subscribe(x=>
      {
        console.log('Computer =', x)
        this.editComputer = x
        this.IsComputerEdit = true
        this.selected.setValue(2);
      })
   }
   ngOnInit(): void {
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe()
  }  
}
