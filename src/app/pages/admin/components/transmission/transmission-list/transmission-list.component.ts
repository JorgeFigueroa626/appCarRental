import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-transmission-list',
  templateUrl: './transmission-list.component.html',
  styleUrls: ['./transmission-list.component.scss']
})
export class TransmissionListComponent implements OnInit {

  transmissions:any;
  isSpinning:boolean = false;

  constructor(
    private _transmissionService:CarService
  ){}

  ngOnInit(): void {
    this.getMyBookings();
  }

  getMyBookings(){
    this.isSpinning = true;
    this._transmissionService.getAllTransmissions().subscribe(
      (resp)=>{
        this.isSpinning = false;
        console.log(resp);
        this.transmissions = resp;
      }
    )
  }

}
