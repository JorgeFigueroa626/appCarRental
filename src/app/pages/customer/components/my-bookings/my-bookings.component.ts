import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';

@Component({
  selector: 'app-my-bookings',
  templateUrl: './my-bookings.component.html',
  styleUrls: ['./my-bookings.component.scss']
})
export class MyBookingsComponent implements OnInit{

  bookedCars:any;
  isSpinning:boolean = false;

  constructor(
    private _bookACarService:CarService
  ){}

  ngOnInit(): void {
    this.getMyBookings();
  }

  getMyBookings(){
    this.isSpinning = true;
    this._bookACarService.findAllBookingsByUserId().subscribe(
      (resp)=>{
        this.isSpinning = false;
        console.log(resp);
        this.bookedCars = resp;
      }
    )
  }

}
