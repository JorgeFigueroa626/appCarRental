import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarManageComponent } from './components/car/car-manage/car-manage.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { MaterialNZZorro } from 'src/app/material-nz-zorro';
import { UpdateCarComponent } from './components/car/update-car/update-car.component';
import { BookingListComponent } from './components/booking/booking-list/booking-list.component';
import { CarSearchComponent } from './components/car/car-search/car-search.component';
import { BransManageComponent } from './components/brand/brans-manage/brans-manage.component';
import { FuelManageComponent } from './components/fuel/fuel-manage/fuel-manage.component';
import { TransmissionManageComponent } from './components/transmission/transmission-manage/transmission-manage.component';
import { TransmissionListComponent } from './components/transmission/transmission-list/transmission-list.component';
import { FuelListComponent } from './components/fuel/fuel-list/fuel-list.component';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';


@NgModule({
  declarations: [
    AdminDashboardComponent,
    CarListComponent,
    CarManageComponent,
    UpdateCarComponent,
    BookingListComponent,
    CarSearchComponent,
    BransManageComponent,
    FuelManageComponent,
    TransmissionManageComponent,
    TransmissionListComponent,
    FuelListComponent,
    BrandListComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,

     ///
     FormsModule,
     ReactiveFormsModule,
     HttpClientModule,
     MaterialNZZorro
  ]
})
export class AdminModule { }
