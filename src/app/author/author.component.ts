import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-author',
  templateUrl: './author.component.html',
  styleUrls: ['./author.component.css']
})
export class AuthorComponent implements OnInit {

  id:any;
  author:any;
  articles:any;
  constructor(private act :ActivatedRoute , public _auth: AuthService , private data : DataService , private router: Router ) { }

  ngOnInit(): void {
    const userId = this._auth.getIdforfrontend(); 
    if (userId) { 
      this._auth.getById(userId)
        .subscribe(
          (res) => { 
            this.author = res; 
          },
          (error) => {
            console.error('Error fetching user data:', error);
          }
        );
    } else {
      console.log('No user id available'); 
    }


    this.data.getArticleByIdAuthor(this.id)
    .subscribe(
       res =>{
        this.articles = res;
       },
       err => {
        console.log(err);
       }
     
    )
  }

  deleteArticle(id: string): void {
    if (confirm('Are you sure you want to delete your profile?')) {
    const userId = this._auth.getIdforfrontend(); 
    this.data.deleteArticle(userId)
    .subscribe(
      (res) => {
        console.log('Article deleted successfully'); 
        this.router.navigate(['/home']);
      },
      (error) => {
        console.error('Error deleting article:', error);
        // Handle error (e.g., show error message)
      }
    );
  }
}
}
