import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {

  const _Router = inject(Router) //Another Way To Dependence Injection "Router"
  

  // To Prevents Move To Another Component If He not Authariaztion
  // if(sessionStorage.getItem('token')){
  //   return true;
  // }else{ 
  //   _Router.navigate(['/auth/login'])
  //   return false;
  // }


  if (typeof window !== 'undefined' && sessionStorage.getItem('token')) {
    return true; // السماح بالوصول إذا كان هناك توكن
  } else {
    _Router.navigate(['/auth/login']); // إعادة التوجيه إلى صفحة تسجيل الدخول
    return false; // منع الوصول
  }





};