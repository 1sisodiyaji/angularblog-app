import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  author = {
    email: '',
    password: ''
  };

  errorMessage: string | null = null;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  token: any;

  login() {
    if (!this.author.email) {
      this.errorMessage = 'Email is required.';
      return;
    }
    
    // Email validation regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.author.email)) {
      this.errorMessage = 'Invalid email format.';
      return;
    }
    
    if (!this.author.password) {
      this.errorMessage = 'Password is required.';
      return;
    }

    this._auth.login(this.author)
      .subscribe(
        response => {
          console.log('Registration response:', response);
          if (response.status === 200) {
            console.log(response.body.message);
            localStorage.setItem('token', response.body.token);
            this.router.navigate(['/home']);
          } else {
            console.log('Unexpected response status:', response.status);
            this.errorMessage =   response.body.message;
          }
        },
        error => {
          console.log('Registration error:', error);
          this.errorMessage = error.error.message || 'An error occurred during registration. Please try again.';
        }
      );
  }
}
