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
  private expirationTime = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
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
    const adminData = {
      ...value,
      timestamp: new Date().getTime() // Add timestamp
    };
    localStorage.setItem(this.adminKey, JSON.stringify(adminData));
    this.adminInfoSubject.next(adminData);
  }

  getUserInfo() {
    const storedUserInfo = localStorage.getItem(this.userKey);
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }

  getAdminInfo() {
    const storedAdminInfo = localStorage.getItem(this.adminKey);
    if (storedAdminInfo) {
      const adminData = JSON.parse(storedAdminInfo);
      const currentTime = new Date().getTime();

      // Check if the admin info has expired
      if (currentTime - adminData.timestamp > this.expirationTime) {
        this.deleteAdminInfo(); // Invalidate admin info
        return null;
      }
      return adminData;
    }
    return null;
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
      currentAdminInfo = { ...currentAdminInfo, ...updatedData, timestamp: new Date().getTime() }; // Update timestamp
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
