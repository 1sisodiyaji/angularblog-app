import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-edit-blog',
  templateUrl: './edit-blog.component.html',
  styleUrls: ['./edit-blog.component.css']
})
export class EditBlogComponent implements OnInit {
  article: any = {
    title: '',
    tags: [],
    description: '',
    content: '',
    image: ''
  };
  tag: string = '';
  imageFile: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private dataService: DataService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.dataService.getArticleById(articleId).subscribe(
        (data) => {
          this.article = data;
        },
        (error) => {
          console.error('Error fetching article:', error);
        }
      );
    }
  }

  select(event: any): void {
    this.imageFile = event.target.files[0];
  }

  addTag(): void {
    if (this.tag.trim()) {
      this.article.tags.push(this.tag.trim());
      this.tag = '';
    }
  }

  updateArticle(): void {
    const formData = new FormData();
    formData.append('title', this.article.title);
    formData.append('tags', JSON.stringify(this.article.tags));
    formData.append('description', this.article.description);
    formData.append('content', this.article.content);
    if (this.imageFile) {
      formData.append('image', this.imageFile);
    }

    const articleId = this.route.snapshot.paramMap.get('id');
    if (articleId) {
      this.dataService.updateArticle(articleId, formData).subscribe(
        () => {
          console.log('Article updated successfully');
          this.router.navigate(['/article', articleId]);
        },
        (error) => {
          console.error('Error updating article:', error);
          this.errorMessage = 'Failed to update article';
        }
      );
    }
  }
}
