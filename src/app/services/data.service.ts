import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http: HttpClient) { }

  createurl = 'http://localhost:8081/articles/create';
  fetchAll = 'http://localhost:8081/articles/all';
  fetchbyIdAuthor = 'http://localhost:8081/articles/getbyidAuthor/';
  fetchbyId = 'http://localhost:8081/articles/getbyid/';
  mailurl = 'http://localhost:8081/send-email';

  create(article: any) {
    return this.http.post(this.createurl, article);
  }

  getAll() {
    return this.http.get(this.fetchAll);
  }

  getArticleByIdAuthor(id: any) {
    return this.http.get(this.fetchbyIdAuthor + id);
  }

  getArticleById(id: any) {
    return this.http.get(this.fetchbyId + id);
  }

  sendEmail(emailData: any): Observable<any> {
    return this.http.post<any>(this.mailurl, emailData);
  }

}
