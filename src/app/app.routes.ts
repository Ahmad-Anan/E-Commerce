import { Routes } from '@angular/router';
import { AuthComponent } from './layout/auth/auth.component';
// import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
// import { CartComponent } from './components/cart/cart.component';
import { ProductsComponent } from './components/products/products.component';
// import { CategoriesComponent } from './components/categories/categories.component';
import { BrandsComponent } from './components/brands/brands.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { MainComponent } from './layout/main/main.component';
import { authGuard } from './core/guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { ResetPasswordComponent } from './components/reset-password/reset-password.component';

export const routes: Routes = [
{path:'', component:AuthComponent, children:[
    {path:'', redirectTo:'login', pathMatch:'full'},
    {path:'login', component:LoginComponent, title:'Login'},
    // {path:'register', component:RegisterComponent, title:'Register'},
    {path:'register', loadComponent : ()=> import('./components/register/register.component').then((ComponentClass)=>ComponentClass.RegisterComponent), title:'Register'},

    {path:'ResetPassword', component:ResetPasswordComponent, title:'Reset-Password'},
]},

{path:'', component:MainComponent, canActivate:[authGuard] ,children:[
    {path:'', redirectTo:'home', pathMatch:'full'},
    {path:'home', component:HomeComponent, title:'Home'},
    {path:'products', component:ProductsComponent, title:'Products'},
    // {path:'categories', component:CategoriesComponent, title:'Categories'},
    {path:'categories', loadComponent : ()=> import('./components/categories/categories.component').then((ComponentClass)=>ComponentClass.CategoriesComponent), title:'Categories'},
    // {path:'brands', component:BrandsComponent, title:'Brands'},
    {path:'brands',  loadComponent : ()=> import('./components/brands/brands.component').then((ComponentClass)=>ComponentClass.BrandsComponent), title:'Brands'},
    {path:'productDetails/:p_id', component:ProductDetailsComponent, title:'Details'},
    // {path:'cart', component:CartComponent, title:'Cart'},
    {path:'cart', loadComponent : ()=> import('./components/cart/cart.component').then((ComponentClass)=>ComponentClass.CartComponent), title:'Cart'},
    { path:'allorders', component: AllordersComponent, title: 'All Orders' },
    {path:'checkout/:cart_id', component:CheckoutComponent, title:'Check-out'},
]},

{path:'**', component:NotFoundComponent, title:'Error'}



];
