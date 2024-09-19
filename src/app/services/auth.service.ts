import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environments';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private localStorageKey = 'UserInfo';

  setUserInfo(value: any) {
    // Save UserInfo to local storage
    localStorage.setItem(this.localStorageKey, JSON.stringify(value));
  }

  getUserInfo() {
    // Retrieve UserInfo from local storage
    const storedUserInfo = localStorage.getItem(this.localStorageKey);
    return storedUserInfo ? JSON.parse(storedUserInfo) : null;
  }

  deleteUserInfo() {
    // Remove UserInfo from local storage
    localStorage.removeItem(this.localStorageKey);
  }
}
