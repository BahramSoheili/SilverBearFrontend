import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Output() sidenavToggle = new EventEmitter<void>()
  @Output() SettingSideToggle = new EventEmitter<void>()
  @Output() selectedItem = new EventEmitter<string>()
  firstname: string
  lastname: string
  role: string

  constructor(private router : Router) {
  }

  ngOnInit() {
  }
  onToggleSidenav(){
    console.log("SidenavToggleEvent")
    this.sidenavToggle.emit()
  }
  onToggleSettingSide(){
    console.log("SettingSideToggleEvent")
    this.SettingSideToggle.emit()
  }
  onSelectedItem(item){
    console.log("Header: " + item)
    this.selectedItem.emit(item)
  }  
}
