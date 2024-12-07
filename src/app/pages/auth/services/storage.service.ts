import { Injectable } from '@angular/core';

const TOKEN = "token";
const USER = "user";

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  constructor() {}

  static saveToken(token: any): void {
    window.localStorage.removeItem(TOKEN);
    window.localStorage.setItem(TOKEN, token);
  }

  static saveUser(user: any): void {
    window.localStorage.removeItem(USER);
    window.localStorage.setItem(USER, JSON.stringify(user));
  }

  static getToken() {
    return window.localStorage.getItem(TOKEN);
  }

  static getUser() {
    return JSON.parse(localStorage.getItem(USER));
  }

  static getUserId():string {
    const user = this.getUser();
    if (user == null) {
      return '';
    }
    return user.id;
  }

  static getUserRol(): string {
    const user = this.getUser();
    if (user == null) return '';
    return user.rol;
  }

  static isAdminLoggedIn():boolean{
    if (this.getToken() == null) return false;
    const rol:string = this.getUserRol();
    return rol == "ADMIN";
  }

  static isCustomerLoggedIn():boolean{
    if (this.getToken() == null) return false;
    const rol:string = this.getUserRol();
    return rol == "CUSTOMER";
  }

  static logout() {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  }
}
