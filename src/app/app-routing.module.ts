import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './pages/auth/components/login/login.component';
import { SignupComponent } from './pages/auth/components/signup/signup.component';
import { AdminGuard } from './guard/admin.guard';
import { CustomerGuard } from './guard/customer.guard';


const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: SignupComponent },

  {
    path: 'admin',
    loadChildren: () =>
      import('./pages/admin/admin.module').then((a) => a.AdminModule),
    // canActivate: [AdminGuard],
  },
  {
    path: 'customer',
    loadChildren: () =>
      import('./pages/customer/customer.module').then((m) => m.CustomerModule),
    // canActivate: [CustomerGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
