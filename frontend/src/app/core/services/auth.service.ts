import { Injectable } from '@angular/core';
import {ApiService} from './api.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private api= '/api/auth';

  constructor(private apiService: ApiService) {}

  register(data: any) {
    return this.apiService.post<any>(`${this.api}/register`, data);
  }

  login(data: any) {
    return this.apiService.post<any>(`${this.api}/login`, data);
  }

  saveToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken() {
    return localStorage.getItem('token');
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {

    const token = this.getToken();

    if (!token) {
      return false;
    }

    try {
      const payload = JSON.parse(atob(token.split('.')[1]));

      const expiration = payload.exp * 1000;

      if(Date.now() >= expiration) {
        this.logout();
        return false;
      }
      return true;

    }catch(err) {
      this.logout();
      return false;
    }

  }

  getUsername(): string | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.sub;
  }

  getUserId(): number | null {
    const token = this.getToken();
    if (!token) return null;

    const payload = JSON.parse(atob(token.split('.')[1]));
    return payload.userId;
  }




}
