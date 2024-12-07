import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { StorageService } from 'src/app/pages/auth/services/storage.service';
import { CarService } from 'src/app/pages/customer/services/car.service';

@Component({
  selector: 'app-book-a-car',
  templateUrl: './book-a-car.component.html',
  styleUrls: ['./book-a-car.component.scss']
})
export class BookACarComponent implements OnInit{

  carId:number = this._route.snapshot.params['carId'];
  car:any;
  processedImage:any;
  validateForm!:FormGroup

  isSpinning:boolean = false; 
  dateFormat:'DD-MM-YYYY'

  constructor(
    private _carService: CarService,
    private _route:ActivatedRoute,
    private _fb:FormBuilder,
    private _message:NzMessageService,
    private _router: Router
  ){}

  ngOnInit(): void {
    this.validateForm = this._fb.group({
      toDate: [null, [Validators.required]],
      fromDate: [null, [Validators.required]]
    })
   this.getByCarId();
  }

  getByCarId(){
    this._carService.getByCarId(this.carId).subscribe(
      (resp)=>{
        console.log(resp);
        this.processedImage = 'data:image/jpeg;base64,' + resp.returnedImage;
        this.car = resp;
      }
    )
  }

  bookACar(data:any){
    console.log(data);
    this.isSpinning = true;
    let bookACarDto = {
      toDate: data.toDate,
      fromDate: data.fromDate,
      carId :this.carId,
      userId: StorageService.getUserId(),
    }

    this._carService.bookACar(bookACarDto).subscribe(
      (resp)=>{
        this._message.success('Booking request submitted successfully', {nzDuration: 5000});
        this._router.navigateByUrl('/customer/dashboard');
      },
      (error)=>{
        this._message.error('Something went wrong', {nzDuration: 5000});
      }
    )
    
  }

}
