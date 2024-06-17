import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import {  catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  createurl = 'http://localhost:8081/articles/createarticle';
  fetchAll = 'http://localhost:8081/articles/all';
  fetchbyIdAuthor = 'http://localhost:8081/articles/getbyidAuthor/';
  fetchbyId = 'http://localhost:8081/articles/getbyid/';
  mailurl = 'http://localhost:8081/send-email'; 

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

  getAll() {
    return this.http.get(this.fetchAll);
  }

  getArticleByIdAuthor(id: any) {
    console.log(id);
    return this.http.get(this.fetchbyIdAuthor + id);
  }

  getArticleById(id:any): Observable<any> {
    return this.http.get<any>(`http://localhost:8081/articles/getbyid/${id}`, { observe: 'response' })
      .pipe(
        catchError(this.handleError)
      );
  }

  sendEmail(emailData: any): Observable<any> {
    return this.http.post<any>(this.mailurl, emailData);
  }

  deleteArticle(id: string): Observable<any> {
    console.log(id);
    return this.http.delete(`http://localhost:8081/articles/delete/${id}`);
  }

 
  
  updateArticle(id: string, formData: FormData): Observable<any> {
    return this.http.put<any>(`http://localhost:8081/articles/update/${id}`, formData)
       
  }
}
