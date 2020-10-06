import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';

const routes: Routes = [

  { path: '', children:[
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'home', component: DashboardComponent },
    { path: 'profile', component: ProfileComponent },
    { path: 'login', component: LoginComponent },
   ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
