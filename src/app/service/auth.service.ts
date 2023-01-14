import { Router } from '@angular/router';
import { User } from 'src/app/models/User';
import { TokenResponse } from '../models/request/TokenReponse';
import { Observable, Subject } from 'rxjs';
import { LoginRequest } from '../models/request/LoginRequest';
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
    localStorage.removeItem('role');
    this.loginStatus.next(false);
    this.router.navigate(['']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  getRole(){
    const role: string | null  = localStorage.getItem('role');
    return role ? role : '';
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

  getUserRole(): Observable<any> {
    const user: User | null = this.getUser()
    const id = user?.id;

    return this.http.get<any>(`${this.rootURL}/role/${id}`);
  }

  getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.rootURL}/current-user`)
  }
}
