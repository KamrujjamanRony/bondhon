import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private localStorageKey = 'UserInfo';
  private userInfoSubject = new BehaviorSubject<any>(this.getUserInfo());

  // Observable for components to subscribe to
  userInfo$ = this.userInfoSubject.asObservable();

  setUserInfo(value: any) {
    // Save UserInfo to local storage
    localStorage.setItem(this.localStorageKey, JSON.stringify(value));
    this.userInfoSubject.next(value); // Notify subscribers
  }

  getUserInfo() {
    // Retrieve UserInfo from local storage
    const storedUserInfo = localStorage.getItem(this.localStorageKey);
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }

  updateUserInfo(updatedData: any) {
    // Get the current user data from local storage
    let currentUserInfo = this.getUserInfo();
    
    if (currentUserInfo) {
      // Merge updated data with the existing user data
      currentUserInfo = { ...currentUserInfo, ...updatedData };
      
      // Save the updated user data to local storage
      this.setUserInfo(currentUserInfo);
    }
  }

  deleteUserInfo() {
    // Remove UserInfo from local storage
    localStorage.removeItem(this.localStorageKey);
    this.userInfoSubject.next(null); // Notify subscribers of logout
  }
}
