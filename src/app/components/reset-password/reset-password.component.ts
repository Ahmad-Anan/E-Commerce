import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router,RouterLink} from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-reset-password',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.css'
})
export class ResetPasswordComponent  implements OnDestroy{
constructor(private _FormBuilder:FormBuilder, private _AuthService:AuthService, private _Router:Router){}

resetSub!:Subscription
step: number = 1; // 1: email, 2: code, 3: new password
resText: string | null = null;

/******************************************* */
  forgetPasswordForm: FormGroup = this._FormBuilder.group({
  email: [null, [Validators.required, Validators.email]],
});

  resetCodeForm: FormGroup = this._FormBuilder.group({
  resetCode: [null, Validators.required],
});

  newPasswordForm: FormGroup = this._FormBuilder.group({
    email: [null, [Validators.required, Validators.email]], // تغيير الاسم
    newPassword: [null, [Validators.required,Validators.pattern(/^\w{6,}$/)]],
});

/************************************************** */
searchEmail(): void {
  if (this.forgetPasswordForm.invalid) return;

  this.resetSub = this._AuthService.forgetPassword(this.forgetPasswordForm.value).subscribe({
    next: (res) => {
      this.resText = res.message;
      this.step = 2; // Move to the next step
    },
    error: (err) => {
      this.resText = err.error.message;
    }
  });
}


sendCode(): void {
  if (this.resetCodeForm.invalid) return;
  this.resetSub = this._AuthService.resetCode(this.resetCodeForm.value).subscribe({
    next: (res) => {
      this.resText = res.message;
      this.step = 3; // Move to the next step
    },
    error: (err) => {
      this.resText = err.error.message;
    }
  });
}

resetPassword(): void {
  if (this.newPasswordForm.invalid) return;

  this.resetSub = this._AuthService.newPassword(this.newPasswordForm.value).subscribe({
    next: (res) => {
      this.resText = res.message;
      this.resetCodeForm.reset();
      this.newPasswordForm.reset();
      this._Router.navigate(['/login'])   // Routing To Another Link Or Page
    },
    error: (err) => {
      this.resText = err.error.message;
    }
  });
}

ngOnDestroy(): void {
  this.resetSub?.unsubscribe()
}
}

/*************************************************************************** */

