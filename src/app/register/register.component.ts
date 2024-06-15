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
  }

  image: any;
  
  constructor(private _auth: AuthService, private router: Router) { }

  ngOnInit(): void {
  }

  select(e: any) {
    this.image = e.target.files[0];
    console.log(this.image);
  }

  register() {
    let fd = new FormData();
    fd.append('name', this.author.name);
    fd.append('lastname', this.author.lastname);
    fd.append('email', this.author.email);
    fd.append('password', this.author.password);
    fd.append('about', this.author.about);
    fd.append('image', this.image); 

    this._auth.register(fd)
      .subscribe(
        response => {
          if (response.status === 201) {
            console.log(response.body.message);  
            this.router.navigate(['/login']);
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
