import { NgClass } from '@angular/common';
import { Component, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth.service';
import { Router, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule,NgClass,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})




export class LoginComponent implements OnDestroy{
  constructor(private _FormBuilder:FormBuilder, private _AuthService:AuthService, private _Router:Router){}
  loading:boolean= false; 
  resText!:string;
  loginrSub!:Subscription  
  intervalId!:any;




                         /**     Validatiion             */
                        
                         //_FormBuilder ==> Import ==> Must Be Instance Or Dependancy Injection ==> Best Practise From FormControl
  loginForm : FormGroup = this._FormBuilder.group({
    email : [null, [Validators.required,Validators.email]],
    password : [null, [Validators.required,Validators.pattern(/^\w{6,}$/)]],
  })

  /*************************************************************** */

loginUser():void{
  if(this.loginForm.valid){
    this.loading = true;  // To Play Icon
    //  call  Api  Login "Sign In"

    this.loginrSub =this._AuthService.loginrUser(this.loginForm.value).subscribe({
      next:(res)=>{
        this.resText= res.message;
        this.loading = false;// Stop Icon
        sessionStorage.setItem('token', res.token);  /// Storage Token
        this._AuthService.saveDecodeUser();/// Storage Token
        this.intervalId = setInterval( ()=>{
          this._Router.navigate(['/home']) // Routing To Another Link Or Page
        },1000)
      },
      error:(err)=>{
        console.log(err.error.message)
        this.resText= err.error.message;
        this.loading = false;// Stop Icon
      },
      complete:()=>{}, // Do Logic After Next "Success"
    })
  }else{
    this.loginForm.markAllAsTouched() // If You Clicked The Button And Don't Send Data Or Value In Input Show All Erroes "Input Is Required"
  }
  }
/*********************************************************************/
///                             After Subscribe
  ngOnDestroy(): void {
    this.loginrSub?.unsubscribe()
    clearInterval(this.intervalId)
  }
  
}
