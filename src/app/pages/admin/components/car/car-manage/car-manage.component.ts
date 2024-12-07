import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CarService } from '../../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-car-manage',
  templateUrl: './car-manage.component.html',
  styleUrls: ['./car-manage.component.scss'],
})
export class CarManageComponent implements OnInit{
  
  postCarFrom!: FormGroup;
  isSpinning: boolean = false;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  brands:any=[];
  fuels:any=[];
  transmissions:any=[];

  listOfOption : Array<{label:string; value: string}> = [];
  listOfBrands = ['BMW', 'AUDI', 'FERRARI', 'TESLA','VOLVO', 'TOYOTA', 'HONDA', 'FORD', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  listOfType = ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'CNG'];
  listOfTransmission = ['Manual', 'Automatic'];

  listOfColors = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Grey', 'Silver'];

  constructor(
    private _fb: FormBuilder, 
    private _carService: CarService,
    private _router: Router,
    private _message: NzMessageService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.postCarFrom = this._fb.group({
      name: [null, [Validators.required]],
      brandId : [null, [Validators.required]],
      fuelId: [null, [Validators.required]],
      color: [null, [Validators.required]],
      transmissionId: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description:[null, [Validators.required]],
      year: [null, [Validators.required]],
    });

    this.getAllBrands();
    this.getAllFuels();
    this.getAllTransmissions();
  }

  getAllBrands(){
    this._carService.getAllBrands().subscribe(
      (resp)=>{
        //console.log(resp);
        this.brands = resp;
      }
    )
  }

  getAllFuels(){
    this._carService.getAllFuels().subscribe(
      (resp)=>{
        //console.log(resp);
        this.fuels = resp;
      }
    )
  }

  getAllTransmissions(){
    this._carService.getAllTransmissions().subscribe(
      (resp)=>{
        //console.log(resp);
        this.transmissions = resp;
      }
    )
  }

  onFileSelected(event:any){
    this.selectedFile = event.target.files[0];
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = () => {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile)
  }

  posCars(){
    this.isSpinning = true;
    const formData : FormData = new FormData();
    const datePipe = new DatePipe('en-US');
    const date = this.postCarFrom.get('year').value;
    const dateYear = datePipe.transform(date,  'yyyy-MM-dd HH:mm:ss') 
    formData.append('image', this.selectedFile);
    formData.append('brandId', this.postCarFrom.get('brandId').value);
    formData.append('name', this.postCarFrom.get('name').value);
    formData.append('fuelId', this.postCarFrom.get('fuelId').value);
    formData.append('color', this.postCarFrom.get('color').value);
    formData.append('year',  dateYear);
    formData.append('transmissionId', this.postCarFrom.get('transmissionId').value);
    formData.append('description', this.postCarFrom.get('description').value);
    formData.append('price', this.postCarFrom.get('price').value);
    console.log(formData);
    
    this._carService.posCar(formData).subscribe(
      (resp)=>{
        this.isSpinning = false;
        this._message.success('Car posted successfully', {nzDuration: 5000});
        this._router.navigateByUrl('/admin/dashboard');
      },
      (error)=>{
        this._message.error('Error while posting car', {nzDuration: 5000})
      }
    )
  }
}
