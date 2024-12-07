import { Component, OnInit } from '@angular/core';
import { CarService } from '../../../services/car.service';
import { ActivatedRoute, Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-update-car',
  templateUrl: './update-car.component.html',
  styleUrls: ['./update-car.component.scss']
})
export class UpdateCarComponent implements OnInit{
  
  carId = this.route.snapshot.params['carId'];
  updateCarFrom!: FormGroup;
  isSpinning: boolean = false;

  existingImage: string | null = null;
  imgChanged:boolean = false;
  selectedFile: File | null;
  imagePreview: string | ArrayBuffer | null;

  listOfOption : Array<{label:string; value: string}> = [];
  listOfColors = ['Red', 'White', 'Blue', 'Black', 'Orange', 'Grey', 'Silver'];

  listOfBrands = ['BMW', 'AUDI', 'FERRARI', 'TESLA','VOLVO', 'TOYOTA', 'HONDA', 'FORD', 'NISSAN', 'HYUNDAI', 'LEXUS', 'KIA'];
  listOfType = ['Petrol', 'Hybrid', 'Diesel', 'Electric', 'CNG'];
  listOfTransmission = ['Manual', 'Automatic'];

  

  constructor(
    private _fb: FormBuilder, 
    private _carService: CarService,
    private _router: Router,
    private _message: NzMessageService,
    private route:ActivatedRoute
  ){}

  ngOnInit(): void {
    this.updateCarFrom = this._fb.group({
      name: [null, [Validators.required]],
      brand : [null, [Validators.required]],
      type: [null, [Validators.required]],
      color: [null, [Validators.required]],
      transmission: [null, [Validators.required]],
      price: [null, [Validators.required]],
      description:[null, [Validators.required]],
      year: [null, [Validators.required]],
    });
    this.getByCarId();
  }

  getByCarId(){
    this.isSpinning = true;
    this._carService.getByCarId(this.carId).subscribe(
      (resp)=>{
        this.isSpinning = false;
        const carDto = resp;
        this.existingImage = 'data:image/jpeg;base64,' + resp.returnedImage;
        console.log(carDto);
        //console.log(this.existingImage);
        this.updateCarFrom.patchValue(carDto)
         
      }
    )
  }


  onFileSelected(event:any){
    this.selectedFile = event.target.files[0],
    this.imgChanged = true;
    this.existingImage = null,
    this.previewImage();
  }

  previewImage(){
    const reader = new FileReader();
    reader.onload = ()=> {
      this.imagePreview = reader.result;
    }
    reader.readAsDataURL(this.selectedFile);
  }

  updateCar(){
    this.isSpinning = true;
    const formData : FormData = new FormData();

    const datePipe = new DatePipe('en-US');
    const date = this.updateCarFrom.get('year').value;
    const dateYear = datePipe.transform(date,  'yyyy-MM-dd HH:mm:ss') 
    
    if (this.imgChanged && this.selectedFile) {
      formData.append('image', this.selectedFile);
    }
    formData.append('brand', this.updateCarFrom.get('brand').value);
    formData.append('name', this.updateCarFrom.get('name').value);
    formData.append('type', this.updateCarFrom.get('type').value);
    formData.append('color', this.updateCarFrom.get('color').value);
    formData.append('year',  dateYear);
    formData.append('transmission', this.updateCarFrom.get('transmission').value);
    formData.append('description', this.updateCarFrom.get('description').value);
    formData.append('price', this.updateCarFrom.get('price').value);
    console.log(formData);

    this._carService.updateByCarIdAndCarDto(this.carId, formData).subscribe(
      (resp)=>{
        this.isSpinning = false;
        this._message.success('Car update successfully', {nzDuration: 5000});
        this._router.navigateByUrl('/admin/dashboard');
      },
      (error)=>{
        this._message.error('Error while update car', {nzDuration: 5000})
      }
    )
  }
}
