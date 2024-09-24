import { Routes } from '@angular/router';
import { MainComponent } from './layout/main/main.component';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SearchDonorsComponent } from './pages/search-donors/search-donors.component';
import { BloodRequestComponent } from './pages/blood-request/blood-request.component';
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { AccountUpdateComponent } from './pages/account-update/account-update.component';
import { AuthGuard } from './services/auth.guard';
import { AdminPanelComponent } from './layout/admin-panel/admin-panel.component';
import { UserListComponent } from './pages/user-list/user-list.component';

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
            component: SearchDonorsComponent, canActivate: [AuthGuard]
          },
          {
            path: 'blood-request',
            component: BloodRequestComponent, canActivate: [AuthGuard]
          },
          {
            path: 'register',
            component: RegisterComponent
          },
          {
            path: 'login',
            component: LoginComponent
          },
          {
            path: 'account-update',
            component: AccountUpdateComponent, canActivate: [AuthGuard]
          },
        ],
      },
    {
        path: 'admin-panel',
        component: AdminPanelComponent,
        canActivate: [AuthGuard],
        children: [
          {
            path: '',
            component: UserListComponent, canActivate: [AuthGuard]
          },
          {
            path: 'user-list',
            component: SearchDonorsComponent, canActivate: [AuthGuard]
          },
          {
            path: 'make-admin',
            component: BloodRequestComponent, canActivate: [AuthGuard]
          },
        ],
      }
];
