import { Component } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-send-email',
  templateUrl: './send-email.component.html',
  styleUrls: ['./send-email.component.css']
})
export class SendEmailComponent {
  email = {
    to: '',
    subject: '',
    message: ''
  };

  constructor(private dataService: DataService) {}

  sendEmail() {
    this.dataService.sendEmail(this.email)
      .subscribe(
        res => {
          console.log('Email sent successfully');
          window.location.reload();
        },
        err => {
          console.error('Error sending email', err);
          // Optionally, you can show an error message to the user
        }
      );
  }
}
