import { Component, OnInit, EventEmitter, Output, ViewChild } from '@angular/core';
import { MatMenuTrigger } from '@angular/material/menu'

@Component({
  selector: 'app-sidenav-list',
  templateUrl: './sidenav-list.component.html',
  styleUrls: ['./sidenav-list.component.scss']
})
export class SidenavListComponent implements OnInit {
  @Output() closeSidenav = new EventEmitter<void>()
  @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger
  IsAdmin: boolean

  constructor() {
   
   }

  someMethod() {
    this.trigger.openMenu()
  }
  ngOnInit(): void {
  }
  onClose(){
    this.closeSidenav.emit()
  }

}
