import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component' 
import { LoginComponent } from './login/login.component';
import { CoursesComponent } from './courses/courses.component';
import { DetailsComponent } from './details/details.component';
import { EnrollComponent } from './enroll/enroll.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
