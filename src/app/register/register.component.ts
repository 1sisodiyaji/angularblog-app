import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  author = {
    name: '',
    lastname: '',
    email: '',
    password: '',
    about: ''
  };

  image: any;
  errorMessage: string | null = null;

  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  select(e: any) {
    this.image = e.target.files[0];
    console.log(this.image);
  }

  register() {
    if (!this.author.name) {
      this.errorMessage = 'Name is required.';
      return;
    }
    
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

    if (!this.image) {
      this.errorMessage = 'Image is required.';
      return;
    }
  
    if (!this.author.about) {
      this.errorMessage = 'About is required.';
      return;
    }
    
  
  
    let fd = new FormData();
    fd.append('name', this.author.name);
    fd.append('email', this.author.email);
    fd.append('password', this.author.password);
    fd.append('about', this.author.about);
    fd.append('image', this.image);

    this._auth.register(fd)
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
