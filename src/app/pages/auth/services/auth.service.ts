import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { endpoint } from 'src/app/shared/api/host';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private _http: HttpClient,
  ) { }

  signUp(requestDto:any):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.SIGNUP}`;
    return this._http.post(requestUrl, requestDto);
  }

  login(requestDto:any):Observable<any>{
    const requestUrl = `${environment.api}${endpoint.LOGIN}`;
    return this._http.post(requestUrl, requestDto);
  }


}
