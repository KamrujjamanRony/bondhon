import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private router = inject(Router);
  private userKey = 'UserInfo';
  private adminKey = 'AdminInfo';
  private userInfoSubject = new BehaviorSubject<any>(this.getUserInfo());
  private adminInfoSubject = new BehaviorSubject<any>(this.getAdminInfo());

  // Observable for components to subscribe to
  userInfo$ = this.userInfoSubject.asObservable();
  adminInfo$ = this.adminInfoSubject.asObservable();

  setUserInfo(value: any) {
    localStorage.setItem(this.userKey, JSON.stringify(value));
    this.userInfoSubject.next(value);
  }
  setAdminInfo(value: any) {
    localStorage.setItem(this.adminKey, JSON.stringify(value));
    this.adminInfoSubject.next(value);
  }

  getUserInfo() {
    const storedUserInfo = localStorage.getItem(this.userKey);
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }
  getAdminInfo() {
    const storedAdminInfo = localStorage.getItem(this.adminKey);
    return storedAdminInfo ? JSON.parse(storedAdminInfo) : null;
  }

  updateUserInfo(updatedData: any) {
    let currentUserInfo = this.getUserInfo();
    if (currentUserInfo) {
      currentUserInfo = { ...currentUserInfo, ...updatedData };
      this.setUserInfo(currentUserInfo);
    }
  }
  updateAdminInfo(updatedData: any) {
    let currentAdminInfo = this.getAdminInfo();
    if (currentAdminInfo) {
      currentAdminInfo = { ...currentAdminInfo, ...updatedData };
      this.setAdminInfo(currentAdminInfo);
    }
  }

  deleteUserInfo() {
    localStorage.removeItem(this.userKey);
    this.userInfoSubject.next(null);
    this.router.navigateByUrl('/');
  }
  deleteAdminInfo() {
    localStorage.removeItem(this.adminKey);
    this.adminInfoSubject.next(null);
    this.router.navigateByUrl('/admin-login');
  }
}
