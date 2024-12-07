import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { CarService } from '../../services/car.service';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.scss']
})
export class CarSearchComponent {

  searchForm!:FormGroup;
  isSpinning:boolean=false;
  cars:any = [];

  listOfOption : Array<{label:string; value: string}> = [];
  listOfBrands = ['BMW', 'AUDI', 'FERRARI', 'TESLA','VOLVO', 'TOYOTA', 'HONDA', 'FORD', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  listOfType = ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'CNG'];
  listOfTransmission = ['Manual', 'Automatic'];
  listOfColors = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Grey', 'Silver'];

  constructor(
    private _fb:FormBuilder,
    private _carService: CarService,
    private _message:NzMessageService
  ){
    this.searchForm = _fb.group({
      brand:[null],
      type:[null],
      transmission:[null],
      color:[null]
    })
  }

  searchCar(){
    this.isSpinning = true;
    this._carService.searchCar(this.searchForm.value).subscribe(
      (resp)=>{
        resp.carDtoList.forEach(element=> {
          element.processedImg = 'data:image/jpeg;base64,' + element.returnedImage;
          this.cars.push(element);
        });
        this.isSpinning = false;
      }
    )
    
  }

}
