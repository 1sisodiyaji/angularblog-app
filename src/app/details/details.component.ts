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
      res =>{
this.article = res;
      },
      err=>{
        console.log(err);
      }
    )
  }

}
