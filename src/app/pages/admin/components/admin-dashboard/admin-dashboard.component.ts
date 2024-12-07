import { Component, OnInit } from '@angular/core';
import { CarService } from '../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.scss']
})
export class AdminDashboardComponent implements OnInit{

  cars:any = [];
  carId = this.route.snapshot.params['carId'];
  transmissionName:string;
  brandName:string;

  constructor(
    private _carService:CarService,
    private route:ActivatedRoute,
    private _router:Router,
    private _message:NzMessageService
  ){}

  ngOnInit(): void {
    this.findAllCars();
  }

  //OPTION 1
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

  //OPTIONS 2
  // findAllCars() {
  //   this._carService.findAllCars().subscribe(
  //     (cars) => {
  //       const carRequests = cars.map(car => {
  //         // Add image processing directly on the car object
  //         car.processedImg = 'data:image/jpeg;base64,' + car.returnedImage;
  
  //         // Create an array of requests for brand and transmission in parallel
  //         const brandRequest = car.brandId ? this._carService.getByBrandId(car.brandId) : null;
  //         const transmissionRequest = car.transmissionId ? this._carService.getByTransmissionId(car.transmissionId) : null;
  
  //         return forkJoin([brandRequest, transmissionRequest]).pipe(
  //           map(([brand, transmission]) => {
  //             if (brand) {
  //               car.brandName = brand.name;
  //             }
  //             if (transmission) {
  //               car.transmissionName = transmission.name;
  //             }
  //             return car;
  //           })
  //         );
  //       });
  
  //       // Use forkJoin to wait for all car data requests to complete
  //       forkJoin(carRequests).subscribe(
  //         (updatedCars) => {
  //           this.cars = updatedCars; // Set the cars with updated brand and transmission info
  //         },
  //         (error) => {
  //           console.error('Error loading car details:', error);
  //         }
  //       );
  //     },
  //     (error) => {
  //       console.error('Error loading cars:', error);
  //     }
  //   );
  // }

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
