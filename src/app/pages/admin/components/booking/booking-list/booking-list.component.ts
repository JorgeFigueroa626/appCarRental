import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.scss']
})
export class BookingListComponent implements OnInit {

  bookedCars:any;
  isSpinning:boolean=false;

  constructor(
    private _bookingsCar:CarService,
    private _message:NzMessageService
  ){}


  ngOnInit(): void {
    this.getAllBookings();
  }

  getAllBookings(){
    this.isSpinning = true;
    this._bookingsCar.getAllBookings().subscribe(
      (resp)=>{
        this.isSpinning = false;
        console.log(resp);
        this.bookedCars = resp;
        
      }
    )
  }

  changeBookingStatus(bookingId:number, status:string){
    this.isSpinning = true;
    console.log(bookingId, status);
    this._bookingsCar.changeBookingStatus(bookingId, status).subscribe(
      (resp)=>{
        this.isSpinning = false;
        console.log(resp);
        this.getAllBookings();
        this._message.success('Booking status changed successfully!', {nzDuration:5000})
      },
      (error)=>{
        this._message.error('Something went wrong', {nzDuration:5000})
      }
    )
  }

}
