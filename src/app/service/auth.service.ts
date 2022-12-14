import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { TokenResponse } from './../models/TokenReponse';
import { Observable, Subject } from 'rxjs';
import { LoginRequest } from './../models/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly rootURL: string = `api/auth`;
  loginStatus: Subject<boolean> = new Subject<boolean>();

  constructor(private http:HttpClient, private router: Router) { }

  authUser(loginRequest: LoginRequest): Observable<TokenResponse>{

    return this.http.post<TokenResponse>(`${this.rootURL}/authenticate`, loginRequest)
  }

  logIn(token: string): void{
      localStorage.setItem('token',token);
  }

  isLogged(): boolean {
    const token: string | null = localStorage.getItem('token');

    return !token ? false : true;
  }

  logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.loginStatus.next(false);
    this.router.navigate(['']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  setUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }

  getUser(): User | null {
    const strUser: string | null = localStorage.getItem('user');

    if(!strUser){
      this.logOut;
      return null;
    }

    return JSON.parse(strUser)
  }

  getUserRole(): string {
    const user: User | null = this.getUser()

    return user !=null && user?.role ? user.role : "NOT ROLE";
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.rootURL}/current-user`)
  }
}
