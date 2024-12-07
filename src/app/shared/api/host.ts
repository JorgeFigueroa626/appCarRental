import { HttpHeaders } from '@angular/common/http';

export const endpoint = {

    SIGNUP : '/auth/signup',
    LOGIN : '/auth/login',

    CAR : '/api/car',
    BY_CAR_ID : '/api/car/',
    SEARCH_CAR : '/api/car/search',

    BRAND : '/api/brand',
    BRANDS : '/api/brand',
    BY_BRAND_ID : '/api/brand/',

    FUEL : '/api/fuel',
    FUELS : '/api/fuel',
    BY_FUEL_ID : '/api/fuel/',
    
    TRANSMISSION : '/api/transmission',
    TRANSMISSIONS : '/api/transmission',
    BY_TRANSMISSION_ID : '/api/transmission/',


    BOOK_A_CAR : '/api/car/bookACar',
    BOOK_A_CAR_BY_ID : '/api/car/bookACar/',
    BOOKINGS : '/api/car/bookingsCar',
    BOOKINGS_BY_ID : '/api/car/bookingsCar/',

};

export const httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };