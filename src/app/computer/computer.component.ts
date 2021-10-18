import { Component, OnInit } from '@angular/core';
import { ComputerService } from '../services/computer.service';

@Component({
  selector: 'app-computer',
  templateUrl: './computer.component.html',
  styleUrls: ['./computer.component.scss']
})
export class ComputerComponent implements OnInit {
  showDetails: boolean = false;
  constructor(private computerService: ComputerService) { }
  ngOnInit() {
    this.computerService.computerDetails$
    .subscribe(x=> this.showDetails = x != null ? true : false);
  }  
}
