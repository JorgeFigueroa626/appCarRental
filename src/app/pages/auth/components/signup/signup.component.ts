import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import {NzMessageService} from 'ng-zorro-antd/message';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  isSpinning: boolean = false;
  signUpForm!: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _authService:AuthService,
    private _message: NzMessageService,
    private _router:Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this._fb.group({
      name: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required]],
      checkPassword: [null, [Validators.required, this.confirmationValidate]],
    });
  }

  confirmationValidate = (control: FormControl): { [ s: string]: boolean } => {
    if (!control.value) {
      return { require: true };
    } else if (control.value !== this.signUpForm.controls['password'].value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  register(){
    this._authService.signUp(this.signUpForm.value).subscribe(
      (resp)=>{
        if (resp.id != null) {
          this._message.success('SignUp successfully', {nzDuration:5000});
          this._router.navigateByUrl('/login');
        } else {
          this._message.error('Something went wrong', {nzDuration:5000});
        }
        
      }
    )
    
  }

}
