import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnDestroy{
constructor( private _AuthService:AuthService, private _Router:Router){}
loading:boolean= false;
resText !:string;
registerSub!:Subscription  
/*************************************************************** */
                         /*     Validatiion             */
  registerForm : FormGroup = new FormGroup({
    name : new FormControl(null, [Validators.required,Validators.minLength(3),Validators.maxLength(10)]),
    email : new FormControl(null, [Validators.required,Validators.email]), 
    password : new FormControl(null, [Validators.required,Validators.pattern(/^\w{6,}$/)]),
    rePassword : new FormControl(null),
    phone : new FormControl(null, [Validators.required,Validators.pattern(/^01[0125][0-9]{8}$/)])
  },this.confirmPassword)//Invoked The Function 

/*           Custom Validatiion ===>>>  Compare Password And rePassword 
                Make Function 
  4- hold Password.value And rePassword.value
  2- hold  rePassword.value
  3- Compare Password And rePassword  
  4- Return  
            ==> true ==>  null
            ==> false ==> object ==> Custom Error {missMatch:true}
  */

confirmPassword( g : AbstractControl):(null|object){
  // g ==> custom Variable ===> To Hold The FormGroup As All Not Only Password And rePassword This The Best Practise
  // AbstractControl ===> the Parent Of (FormGroup  &&  FormControl && formArray)
  if(g.get('password')?.value === g.get('rePassword')?.value){
      return null; 
  }else{
    return {missMatch:true}
  }
}
/*************************************************************** */
///                             During Submit On Button
registerUser():void{    
    if(this.registerForm.valid){
      this.loading = true; // To Play Icon 
      // call  Api  Register"Sign UP"
      this.registerSub = this._AuthService.registerUser(this.registerForm.value).subscribe({
      next:(res)=>{
        this.resText= res.message;
        setInterval( ()=>{
          this._Router.navigate(['/login']) // Routing To Another Link Or Page
        }, 2000)
        this.loading = false; // Stop Icon
      },
      error:(err)=>{
        this.resText= err.error.message;
        this.loading = false; // Stop Icon
      },
      complete:()=>{}, // Do Logic After Next "Success"
    })
    }else{
      this.registerForm.markAllAsTouched() // If You Clicked The Button And Don't Send Data Or Value In Input ===> Show All Erroes "Input Is Required"
      this.registerForm.setErrors({'missMatch':true}) // To Solve Proplem In markAllAsTouched() In rePassword(confirmPassword)
    }
  }
/*************************************************************** */
///                             After Subscribe
ngOnDestroy(): void {
  this.registerSub?.unsubscribe()
}



}
