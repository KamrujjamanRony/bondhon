import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SearchDonorsComponent } from './pages/search-donors/search-donors.component';
import { BloodRequestComponent } from './pages/blood-request/blood-request.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';

export const routes: Routes = [
    {
        path: '',
        component: MainComponent,
        children: [
          { path: '', redirectTo: 'home', pathMatch: 'full' },
          {
            path: '',
            component: HomeComponent
          },
          {
            path: 'about',
            component: AboutComponent
          },
          {
            path: 'search-donors',
            component: SearchDonorsComponent
          },
          {
            path: 'blood-request',
            component: BloodRequestComponent
          },
          {
            path: 'register',
            component: RegisterComponent
          },
          {
            path: 'login',
            component: LoginComponent
          },
        ],
      }
];
