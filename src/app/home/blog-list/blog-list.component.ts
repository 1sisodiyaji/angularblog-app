import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit {

  articles: any;

  constructor(private data: DataService) { }

  ngOnInit(): void {
    this.data.getAll()
      .subscribe(
        response => {
          console.log('Registration response:', response);
          if (response.status === 200) {
            this.articles = response.body;
            console.log(response.body);  
          } else {
            console.log('Unexpected response status:', response.status); 
          }
        },
        error => {
          console.log('Registration error:', error); 
        }
      );

  }

}
