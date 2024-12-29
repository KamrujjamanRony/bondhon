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
import { AdminGuard } from './services/admin.guard';
import { SuperAdminGuard } from './services/super-admin.guard';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { GalleryListComponent } from './pages/gallery-list/gallery-list.component';
import { GalleryFormComponent } from './pages/gallery-form/gallery-form.component';
import { AdminFormComponent } from './pages/admin-form/admin-form.component';
import { AboutUsComponent } from './pages/about-us/about-us.component';
import { ThanaComponent } from './pages/thana/thana.component';
import { ThanaFormComponent } from './pages/thana-form/thana-form.component';
import { ReportComponent } from './pages/report/report.component';
import { UserFormComponent } from './pages/user-form/user-form.component';
import { AdminListComponent } from './pages/admin-list/admin-list.component';

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
        path: 'gallery',
        component: GalleryComponent
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
    children: [
      { path: '', redirectTo: 'user-list', pathMatch: 'full' },
      {
        path: 'user-list',
        component: UserListComponent
      },
      {
        path: 'user-list/add',
        component: UserFormComponent
      },
      {
        path: 'user-list/edit/:id',
        component: UserFormComponent
      },

      {
        path: 'admin-list',
        component: AdminListComponent
      },
      {
        path: 'admin-list/add',
        component: AdminFormComponent
      },
      {
        path: 'admin-list/edit/:id',
        component: AdminFormComponent
      },

      {
        path: 'thana-list',
        component: ThanaComponent
      },
      {
        path: 'thana-list/add',
        component: ThanaFormComponent
      },
      {
        path: 'thana-list/edit/:id',
        component: ThanaFormComponent
      },

      {
        path: 'report',
        component: ReportComponent
      },
      {
        path: 'gallery-list',
        component: GalleryListComponent
      },
      {
        path: 'gallery-list/add',
        component: GalleryFormComponent
      },
      {
        path: 'gallery-list/edit/:id',
        component: GalleryFormComponent
      },

      {
        path: 'update-about/:id',
        component: AboutUsComponent
      },
    ],
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  }
];
