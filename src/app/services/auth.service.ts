import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private adminLoggedIn = false;
  loginAdmin(email: string, password: string): boolean {
    if (email === 'admin@admin.com' && password === 'admin123') {
      this.adminLoggedIn = true;
      localStorage.setItem('adminLoggedIn', 'true');
      return true;
    }
    return false;
  }

  isAdminLoggedIn(): boolean {
    return this.adminLoggedIn || localStorage.getItem('adminLoggedIn') === 'true';
  }

  logoutAdmin(): void {
    this.adminLoggedIn = false;
    localStorage.removeItem('adminLoggedIn');
    this.router.navigate(['/login']);
  }


  private registerUrl = 'http://localhost:8081/user/register';
  private loginUrl = 'http://localhost:8081/user/login';


  constructor(private http: HttpClient , private router: Router) { }

  register(authorData: FormData): Observable<any> {
    return this.http.post<any>(this.registerUrl, authorData, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) { 
      errorMessage = `Error: ${error.error.message}`;
    } else { 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }


login(author:any): Observable<any> {
  return this.http.post<any>(this.loginUrl, author, { observe: 'response' })
    .pipe(
      catchError(this.handleError)
    );
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

getIdforfrontend() {
  const token = localStorage.getItem('token'); 

  if (!token) {
    console.log('No token found');
    return null;
  }

  try {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    const data = JSON.parse(jsonPayload); 

    if (data && data.userId) { 
      return data.userId;
    } else {
      console.error('User ID not found in token data');
      return null;
    }
  } catch (e) {
    console.error('Failed to decode token', e);
    return null;
  }
}
 

getById(id: any) {
  console.log(id);
  return this.http.get(`http://localhost:8081/user/getbyid/${id}`);
}

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