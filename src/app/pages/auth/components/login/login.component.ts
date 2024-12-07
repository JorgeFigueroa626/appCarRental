import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { NzMessageService } from 'ng-zorro-antd/message';
import { Router } from '@angular/router';
import { StorageService } from '../../services/storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  isSpinning: boolean = false;
  loginForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService: AuthService,
    private _message: NzMessageService,
    private _router: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this._fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
    });
  }

  login() {
    this._authService.login(this.loginForm.value).subscribe(
      (resp) => {
        if (resp.userId != null) {
          const user = {
            id: resp.userId,
            rol: resp.rol,
          };
          StorageService.saveUser(user);
          StorageService.saveToken(resp.token);
          if (StorageService.isAdminLoggedIn()) {
            this._router.navigateByUrl('/admin/dashboard');
          } else if (StorageService.isCustomerLoggedIn()) {
            this._router.navigateByUrl('/customer/dashboard');
          } else {
            this._message.info('Bad credentials', { nzDuration: 5000 });
          }
        }
      // console.log(resp);
    });
  }
}
