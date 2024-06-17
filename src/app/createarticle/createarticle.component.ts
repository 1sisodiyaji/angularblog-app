import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-createarticle',
  templateUrl: './createarticle.component.html',
  styleUrls: ['./createarticle.component.css']
})
export class CreatearticleComponent implements OnInit {


  article: any = {
    title: '',
    content: '',
    tags: [],
    description: '',
    idAuthor: ''
  }
  tag: any = '';
  errorMessage: string | null = null;
  image: any;
  select(e: any) {
    this.image = e.target.files[0];
  }

  constructor(private _auth: AuthService, private data: DataService, private router: Router) { }

  ngOnInit(): void {
  }

  create() {
    let fd = new FormData;
    fd.append('title', this.article.title);
    fd.append('content', this.article.content);
    fd.append('tags', JSON.stringify(this.article.tags));
    fd.append('description', this.article.description);
    fd.append('image', this.image);
    fd.append('idAuthor', this._auth.getIdforfrontend());

    console.log("entered"+ fd);
    this.data.create(fd)
    .subscribe(
      response => {
        console.log('Article response:', response);
        if (response.status === 200) {
          console.log(response.body.message);
          this.router.navigate(['/home']);
        } else {
          console.log('Unexpected response status:', response.status);
          this.errorMessage =   response.body.message;
        }
      },
      error => {
        console.log('Article error:', error);
        this.errorMessage = error.error.message || 'An error occurred during registration. Please try again.';
      }
    );
  }

}
