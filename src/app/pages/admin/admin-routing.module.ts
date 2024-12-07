import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminDashboardComponent } from './components/admin-dashboard/admin-dashboard.component';
import { CarListComponent } from './components/car/car-list/car-list.component';
import { CarManageComponent } from './components/car/car-manage/car-manage.component';
import { UpdateCarComponent } from './components/car/update-car/update-car.component';
import { BookingListComponent } from './components/booking/booking-list/booking-list.component';
import { CarSearchComponent } from './components/car/car-search/car-search.component';
import { BrandListComponent } from './components/brand/brand-list/brand-list.component';
import { BransManageComponent } from './components/brand/brans-manage/brans-manage.component';
import { FuelListComponent } from './components/fuel/fuel-list/fuel-list.component';
import { FuelManageComponent } from './components/fuel/fuel-manage/fuel-manage.component';
import { TransmissionListComponent } from './components/transmission/transmission-list/transmission-list.component';
import { TransmissionManageComponent } from './components/transmission/transmission-manage/transmission-manage.component';

const routes: Routes = [
  {path: 'dashboard', component: AdminDashboardComponent},

  {path: 'car-list', component: CarListComponent},
  {path: 'car-manage', component: CarManageComponent},
  {path: 'update-car/:carId', component: UpdateCarComponent},

  {path: 'brand-list', component: BrandListComponent},
  {path: 'brans-manage', component: BransManageComponent},

  {path: 'fuel-list', component: FuelListComponent},
  {path: 'fuel-manage', component: FuelManageComponent},

  {path: 'transmission-list', component: TransmissionListComponent},
  {path: 'transmission-manage', component: TransmissionManageComponent},


  {path: 'bookings', component: BookingListComponent},
  {path: 'search', component: CarSearchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
