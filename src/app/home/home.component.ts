import { Component, OnInit, OnDestroy } from '@angular/core'
import { Subscription } from 'rxjs'
import { ComputerService } from '../services/computer.service'



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  title = 'Silver Bear'
  sub1: Subscription  
  showComputerDetails: boolean  
  constructor(
    private computerService: ComputerService) { }
  ngOnInit() {
    this.sub1 = this.computerService.computerDetails$
    .subscribe(x=> {
      if(x != null){
        this.setAllFalse()
        this.showComputerDetails = true
        console.log('showComputerDetails = ', this.showComputerDetails)
      }    
    })    
  }
  setAllFalse(){    
    this.showComputerDetails = false  
  }
  ngOnDestroy(): void {
    this.sub1.unsubscribe()    
  }
}
