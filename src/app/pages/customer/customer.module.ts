import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CustomerRoutingModule } from './customer-routing.module';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialNZZorro } from 'src/app/material-nz-zorro';
import { BookACarComponent } from './components/book-a-car/book-a-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { CarSearchComponent } from './components/car-search/car-search.component';


@NgModule({
  declarations: [
    CustomerDashboardComponent,
    BookACarComponent,
    MyBookingsComponent,
    CarSearchComponent,
  ],
  imports: [
    CommonModule,
    CustomerRoutingModule,

    ///
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    MaterialNZZorro
  ]
})
export class CustomerModule { }
