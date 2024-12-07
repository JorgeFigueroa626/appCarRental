import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CustomerDashboardComponent } from './components/customer-dashboard/customer-dashboard.component';
import { BookACarComponent } from './components/book-a-car/book-a-car.component';
import { MyBookingsComponent } from './components/my-bookings/my-bookings.component';
import { CarSearchComponent } from './components/car-search/car-search.component';

const routes: Routes = [
  {path: 'dashboard', component: CustomerDashboardComponent},
  {path: 'booking/:carId', component: BookACarComponent},
  {path: 'my-bookings', component: MyBookingsComponent},
  {path: 'search', component: CarSearchComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
