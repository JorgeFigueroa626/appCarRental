import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-fuel-list',
  templateUrl: './fuel-list.component.html',
  styleUrls: ['./fuel-list.component.scss']
})
export class FuelListComponent implements OnInit {

  fuels:any;
  isSpinning:boolean = false;

  constructor(
    private _fuelService:CarService
  ){}

  ngOnInit(): void {
    this.getMyBookings();
  }

  getMyBookings(){
    this.isSpinning = true;
    this._fuelService.getAllFuels().subscribe(
      (resp)=>{
        this.isSpinning = false;
        console.log(resp);
        this.fuels = resp;
      }
    )
  }

}
