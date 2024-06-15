import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css']
})
export class EditProfileComponent implements OnInit {

  userData: any = {
    name: '',
    email: '',
    about: ''
  };

  selectedImage: File | null = null;
  errorMessage: string | null = null;

  constructor(
    private authService: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public _auth: AuthService
  ) { }
  ngOnInit(): void {
    // Fetch user data based on route parameter
    const userId = this._auth.getIdforfrontend();
    if (userId) {
      this.authService.getById(userId)
        .subscribe(
          (data: any) => {
            this.userData = data;
            console.log(this.userData);
          },
          (error) => {
            console.error('Error fetching user data:', error);
            // Handle error as needed (e.g., show error message)
            this.errorMessage = 'Failed to fetch user data';
          }
        );
    } else {
      console.error('No user ID provided in route');
      // Handle error as needed (e.g., redirect or show error message)
      this.errorMessage = 'User ID not found in route';
    }
  }

  getImageUrl(): string {
    return this.userData.image ? `assets/user/${this.userData.image}` : 'assets/user/default-profile-image.png';
  }

  onImageSelected(event: any): void {
    this.selectedImage = event.target.files[0];
  }

  updateProfile(): void {
    const userId = this._auth.getIdforfrontend();
    const formData = new FormData();
    formData.append('name', this.userData.name);
    formData.append('lastname', this.userData.lastname);
    formData.append('about', this.userData.about);
    if (this.selectedImage) {
      formData.append('image', this.selectedImage);
    }

    this.authService.updateProfile(userId , formData)
      .subscribe(
        () => {
          console.log('Profile updated successfully');
          this.router.navigate([`/author/${userId}`]);
        },
        (error) => {
          console.error('Error updating profile:', error);
          this.errorMessage = 'Failed to update profile';
        }
      );
  }

  deleteProfile(): void {
    const userId = this._auth.getIdforfrontend();
    this.userData.id = userId;
    console.log(this.userData.id);
    if (confirm('Are you sure you want to delete your profile?')) {
      this.authService.deleteProfile(this.userData.id)
        .subscribe(
          (res) => {
            console.log('Profile deleted successfully');
            localStorage.removeItem('token');
            this.router.navigate(['/register']);
          },
          (error) => {
            console.error('Error deleting profile:', error);
            this.errorMessage = 'Failed to delete profile';
          }
        );
    }
  }

}
