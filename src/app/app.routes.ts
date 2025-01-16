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
import { AdminGuard } from './services/guard/admin.guard';
import { SuperAdminGuard } from './services/guard/super-admin.guard';
import { GalleryComponent } from './pages/gallery/gallery.component';
import { AboutUsComponent } from './pages/admin-panel/about-us/about-us.component';
import { UserListComponent } from './pages/admin-panel/user-list/user-list.component';
import { UserFormComponent } from './pages/admin-panel/user-form/user-form.component';
import { AdminListComponent } from './pages/admin-panel/admin-list/admin-list.component';
import { AdminFormComponent } from './pages/admin-panel/admin-form/admin-form.component';
import { ThanaComponent } from './pages/admin-panel/thana/thana.component';
import { ThanaFormComponent } from './pages/admin-panel/thana-form/thana-form.component';
import { GalleryListComponent } from './pages/admin-panel/gallery-list/gallery-list.component';
import { GalleryFormComponent } from './pages/admin-panel/gallery-form/gallery-form.component';
import { AdminLoginComponent } from './pages/admin-panel/admin-login/admin-login.component';
import { EditorGuard } from './services/guard/editor.guard';

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
      // {
      //   path: 'register',
      //   component: RegisterComponent
      // },
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
    canActivate: [EditorGuard],
    children: [
      { path: '', redirectTo: 'user-list', pathMatch: 'full' },
      {
        path: 'user-list',
        component: UserListComponent, canActivate: [EditorGuard]
      },
      {
        path: 'user-list/add',
        component: UserFormComponent, canActivate: [EditorGuard]
      },
      {
        path: 'user-list/edit/:id',
        component: UserFormComponent, canActivate: [EditorGuard]
      },

      {
        path: 'admin-list',
        component: AdminListComponent, canActivate: [SuperAdminGuard]
      },
      {
        path: 'admin-list/add',
        component: AdminFormComponent, canActivate: [SuperAdminGuard]
      },
      {
        path: 'admin-list/edit/:id',
        component: AdminFormComponent, canActivate: [SuperAdminGuard]
      },

      {
        path: 'thana-list',
        component: ThanaComponent, canActivate: [AdminGuard]
      },
      {
        path: 'thana-list/add',
        component: ThanaFormComponent, canActivate: [AdminGuard]
      },
      {
        path: 'thana-list/edit/:id',
        component: ThanaFormComponent, canActivate: [AdminGuard]
      },
      {
        path: 'gallery-list',
        component: GalleryListComponent, canActivate: [AdminGuard]
      },
      {
        path: 'gallery-list/add',
        component: GalleryFormComponent, canActivate: [AdminGuard]
      },
      {
        path: 'gallery-list/edit/:id',
        component: GalleryFormComponent, canActivate: [AdminGuard]
      },

      {
        path: 'update-about/:id',
        component: AboutUsComponent, canActivate: [AdminGuard]
      },
    ],
  },
  {
    path: 'admin-login',
    component: AdminLoginComponent
  }
];
