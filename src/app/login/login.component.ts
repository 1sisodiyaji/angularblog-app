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
    this._auth.login(this.author)
      .subscribe(
        res => {
          this.token = res;
          console.log(this.token.token);
          localStorage.setItem('token', this.token.token);
          this.router.navigate(['/home']);
        },
        err => {
          console.log(err);
          this.errorMessage = err.error.message || 'An error occurred during login. Please try again.'; // Set the error message
        }
      );
  }
}
