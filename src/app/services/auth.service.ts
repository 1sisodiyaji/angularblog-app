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

  register(authorData: FormData): Observable<any> {
    return this.http.post<any>(this.registerUrl, authorData, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) {
      // Client-side errors
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Server-side errors
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
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
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const data = JSON.parse(jsonPayload); 
      return data;  
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  } else {
    console.log("No token found");
    return null;
  }
}

getIdforfrontend() : any {
  const token = localStorage.getItem('token');
  console.log(token);
  if (token) {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map((c) => {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      const data = JSON.parse(jsonPayload); 
      return data.id;  
    } catch (e) {
      console.error('Failed to decode token', e);
      return null;
    }
  } else {
    console.log("No token found");
    return null;
  }
}


getById(id: any) {
  console.log(id);
  return this.http.get(`http://localhost:8081/user/getbyid/${id}`);
}

// Update user profile
updateProfile(id: string, formData: FormData): Observable<any> {
  const url = `http://localhost:8081/user/update/${id}`;  
  return this.http.put<any>(url, formData)
    .pipe(
      catchError(this.handleError) 
    );
}
deleteProfile(userId: string): Observable<any> {
  return this.http.delete(`http://localhost:8081/user/delete/${userId}`);
}



 


}