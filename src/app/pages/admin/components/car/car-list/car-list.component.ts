import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-car-list',
  templateUrl: './car-list.component.html',
  styleUrls: ['./car-list.component.scss']
})
export class CarListComponent implements OnInit {

  cars:any=[];
  isSpinning:boolean=false;
  carId = this.route.snapshot.params['carId'];
  brandName:string;
  fuelName:string;
  transmissionName:string;

  constructor(
    private _carService:CarService,
    private _message:NzMessageService,
    private route:ActivatedRoute,
    private _router:Router
  ){}


  ngOnInit(): void {
    this.findAllCars();
  }

  findAllCars(){
    this.isSpinning = true;
    this._carService.findAllCars().subscribe(
      (resp)=>{
        // console.log(resp);
        this.isSpinning = false;
        resp.forEach(element => {
          //Get image
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          //Get name brand
          if (element.brandId) {
            this._carService.getByBrandId(element.brandId).subscribe(
              (brand)=>{
                this.brandName = brand.name;
              }
            )
          }
          //Get name transmission
          if (element.transmissionId) {
            this._carService.getByTransmissionId(element.transmissionId).subscribe(
              (trans)=>{
                this.transmissionName = trans.name;
              }
            )
          }
          //Get name fuel
          if (element.fuelId) {
            this._carService.getByFuelId(element.fuelId).subscribe(
              (trans)=>{
                this.fuelName = trans.name;
              }
            )
          }
          this.cars.push(element)
        });
      }
    )
  }

  delete(carId:number){
    this._carService.deleteByCarId(carId).subscribe(
      (resp)=>{
        this._message.success('Car delete successfully', {nzDuration:5000})
        this._router.navigateByUrl('/admin/dashboard')
      },
      (error)=>{
        this._message.info('Error delete car', {nzDuration:5000})
      }
    )
  }

}
