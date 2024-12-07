import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/shared/api/host';
import { environment } from 'src/environments/environment';
import { StorageService } from '../../auth/services/storage.service';

@Injectable({
  providedIn: 'root',
})
export class CarService {
  constructor(private _http: HttpClient) {}

  posCar(carDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.CAR}`;
    return this._http.post(requestUrl, carDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  findAllCars(): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.CAR}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  getByCarId(carId: number): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.BY_CAR_ID}${carId}`;
    return this._http.get(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  updateByCarIdAndCarDto(carId: number, carDto: any): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.BY_CAR_ID}${carId}`;
    return this._http.put(requestUrl, carDto, {
      headers: this.createAuthorizationHeader(),
    });
  }

  deleteByCarId(carId: number): Observable<any> {
    const requestUrl = `${environment.api}${endpoint.BY_CAR_ID}${carId}`;
    return this._http.delete(requestUrl, {
      headers: this.createAuthorizationHeader(),
    });
  }

  searchCar(searCarDto:any):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.SEARCH_CAR}`;
    return this._http.post(requestUrl, searCarDto, {headers: this.createAuthorizationHeader()})
  }

  //booking
  getAllBookings():Observable<any>{
    const requestUrl = `${environment.api}${endpoint.BOOKINGS}`;
    return this._http.get(requestUrl, {headers: this.createAuthorizationHeader()})
  }

  changeBookingStatus(bookingId:number, status:string):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.BOOKINGS_BY_ID}${bookingId}/${status}`;
    return this._http.get(requestUrl, {headers: this.createAuthorizationHeader()})
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

  getByFuelId(fuelId:number):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.BY_FUEL_ID}${fuelId}`;
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
