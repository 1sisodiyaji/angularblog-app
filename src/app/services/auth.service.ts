import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
 
  private registerUrl = 'http://localhost:8081/user/register';
  constructor(private http: HttpClient) { }

  register(userData: FormData): Observable<HttpResponse<any>> {
    return this.http.post<any>(this.registerUrl, userData, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    console.error('Registration failed', error);
    return throwError('Registration failed. Please try again later.');
  }



login(author:any){
  return  this.http.post('http://localhost:8081/user/login' , author);
}


isLoggedIn(): boolean {
  const token = localStorage.getItem('token');
  return !!token; // Ensure that token is not null or undefined
}

getAuthorDataFromToken(): any {
  const token = localStorage.getItem('token');
  console.log(token);
  if(token){
  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
      return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
    }).join(''));
    const data = JSON.parse(jsonPayload);
    console.log(data);
    return data;
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
}else{
  console.log("no token found");  
}
}


getById(id:any){
  return this.http.get('http://localhost:8081/user/getbyid/'+ id)
}



}