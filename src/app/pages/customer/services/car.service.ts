import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/shared/api/host';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/services/storage.service';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(
    private _http:HttpClient
  ) { }

  findAllCars():Observable<any>{
    const requestUrl = `${environment.api}${endpoint.CAR}`;
    return this._http.get(requestUrl, {headers:this.createAuthorizationHeader()});
  }

  getByCarId(carId:number):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.BY_CAR_ID}${carId}`;
    return this._http.get(requestUrl, {headers: this.createAuthorizationHeader()})
  }

  bookACar(bookACarDto:any):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.BOOK_A_CAR}`;
    return this._http.post(requestUrl, bookACarDto, {headers: this.createAuthorizationHeader()})
  }

  findAllBookingsByUserId():Observable<any>{
    const userId = StorageService.getUserId();
    const requestUrl = `${environment.api}${endpoint.BOOK_A_CAR_BY_ID}${userId}`;
    return this._http.get(requestUrl, {headers: this.createAuthorizationHeader()})
  }

  searchCar(searCarDto:any):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.SEARCH_CAR}`;
    return this._http.post(requestUrl, searCarDto, {headers: this.createAuthorizationHeader()})
  }

  //brand
  getAllBrands():Observable<any>{
    const requestUrl = `${environment.api}${endpoint.BRANDS}`;
    return this._http.get(requestUrl, {headers:this.createAuthorizationHeader()})
  }

  getByBrandId(brandId:number):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.BY_BRAND_ID}${brandId}`;
    return this._http.get(requestUrl, {headers:this.createAuthorizationHeader()})
  }

  //fuel
  getAllFuels():Observable<any>{
    const requestUrl = `${environment.api}${endpoint.FUELS}`;
    return this._http.get(requestUrl, {headers:this.createAuthorizationHeader()})
  }

  //transmission
  getAllTransmissions():Observable<any>{
    const requestUrl = `${environment.api}${endpoint.TRANSMISSIONS}`;
    return this._http.get(requestUrl, {headers:this.createAuthorizationHeader()})
  }

  getByTransmissionId(transmissionId:number):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.BY_TRANSMISSION_ID}${transmissionId}`;
    return this._http.get(requestUrl, {headers:this.createAuthorizationHeader()})
  }

  private createAuthorizationHeader(): HttpHeaders {
    return new HttpHeaders().set(
      'Authorization',
      'Bearer ' + StorageService.getToken()
    );
  }
}
