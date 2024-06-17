import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  createurl = 'https://backendangularblogapp.onrender.com/articles/createarticle';
  fetchAll = '';
  fetchbyIdAuthor = 'https://backendangularblogapp.onrender.com/articles/getbyidAuthor/';
  fetchbyId = 'https://backendangularblogapp.onrender.com/articles/getbyid/';
  mailurl = 'https://backendangularblogapp.onrender.com/send-email'; 

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Unknown error!';
    if (error.error instanceof ErrorEvent) { 
      errorMessage = `Error: ${error.error.message}`;
    } else { 
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
  }

  create(article:any): Observable<any> {
    return this.http.post<any>(this.createurl, article, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

 
  
  getAll(): Observable<any> {
    return this.http.get<any>(`https://backendangularblogapp.onrender.com/articles/all`, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  getArticleByIdAuthor(id: any) {
    console.log(id);
    return this.http.get(this.fetchbyIdAuthor + id);
  }

  getArticleById(id:any): Observable<any> {
    return this.http.get<any>(`https://backendangularblogapp.onrender.com/articles/getbyid/${id}`, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  sendEmail(emailData: any): Observable<any> {
    return this.http.post<any>(this.mailurl, emailData);
  }

  deleteArticle(id: string): Observable<any> {
    console.log(id);
    return this.http.delete(`https://backendangularblogapp.onrender.com/articles/delete/${id}`);
  }

 
  
  updateArticle(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`https://backendangularblogapp.onrender.com/articles/update/${id}`, formData)
       
  }
}
