import { Component, OnInit } from '@angular/core';
import { CarService } from 'src/app/pages/customer/services/car.service';

@Component({
  selector: 'app-customer-dashboard',
  templateUrl: './customer-dashboard.component.html',
  styleUrls: ['./customer-dashboard.component.scss']
})
export class CustomerDashboardComponent implements OnInit {

  cars:any = [];
  brandName:string;
  fuelName:string;
  transmissionName:string;

  constructor(
    private _carService:CarService
  ){}

  ngOnInit(): void {
    this.findAllCars();
  }

  findAllCars(){
    this._carService.findAllCars().subscribe(
      (resp)=>{
        console.log(resp);
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
          this.cars.push(element)
        }); 
      }
    )
  }

}
