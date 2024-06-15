import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { DetailsComponent } from './details/details.component';
import { CreatearticleComponent } from './createarticle/createarticle.component';
import { AboutComponent } from './about/about.component';
import { PrivacyComponent } from './privacy/privacy.component';
import { AuthorComponent } from './author/author.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { AuthGuard } from './services/auth.guard';
import { SendEmailComponent } from './send-email/send-email.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component'; 
import { EditBlogComponent } from './edit-blog/edit-blog.component';

const routes: Routes = [

{path : '' , redirectTo: '/home' ,pathMatch:'full'},

{path : 'home' , component : HomeComponent},
{path : 'article/:id' , component : DetailsComponent},
{path : 'create' ,canActivate :[AuthGuard], component : CreatearticleComponent},
{path : 'about' , component : AboutComponent},
{path : 'edit-profile/:id' , component : EditProfileComponent}, 
{path : 'edit-blog/:id' , component : EditBlogComponent}, 
{path : 'send-mail' , component : SendEmailComponent},

{path : 'privacy' , component : PrivacyComponent},
{path : 'author/:id' , component : AuthorComponent},


{path : 'register' , component : RegisterComponent},
{path : 'login' , component : LoginComponent},





{path : '**' , component : NotfoundComponent}


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
