import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {

id:any;
article :any;

  constructor(private act : ActivatedRoute , private data :DataService) { }

  ngOnInit(): void {
    this.id =  this.act.snapshot.paramMap.get('id');
    this.data.getArticleById(this.id)
    .subscribe(
      response => {
        console.log('Registration response:', response);
        if (response.status === 200) {
          console.log(response.body);
          this.article = response.body;
        } else {
          console.log('Unexpected response status:', response.status);
        }
      },
      error => {
        console.log('Fetching error:', error);
      }
    )
  }

}
