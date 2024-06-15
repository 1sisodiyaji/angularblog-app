import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service'; // Adjust the path as needed
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  authorId: string | null = null;

  constructor(public authService: AuthService ,private router: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      const token = localStorage.getItem('token');
      if (token) {
        const authorData = this.authService.getAuthorDataFromToken(); 
        if (authorData && authorData.id) {
          this.authorId = authorData.id;
          const ID = this.authorId;  
        } else {
          console.error('Invalid token or missing author ID');
        }
      }
    }
  }

  logout(): void {
    console.log("logout eneterd");
   localStorage.removeItem('token');
   this.router.navigate(['/home']);
   console.log("logout successfull");
  }
}
