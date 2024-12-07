import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';

@Component({
  selector: 'app-brand-list',
  templateUrl: './brand-list.component.html',
  styleUrls: ['./brand-list.component.scss']
})
export class BrandListComponent implements OnInit{

  brands:any;
  isSpinning:boolean = false;

  constructor(
    private _brandService:CarService
  ){}

  ngOnInit(): void {
    this.getMyBookings();
  }

  getMyBookings(){
    this.isSpinning = true;
    this._brandService.getAllBrands().subscribe(
      (resp)=>{
        this.isSpinning = false;
        console.log(resp);
        this.brands = resp;
      }
    )
  }

}
