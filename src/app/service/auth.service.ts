import { User } from 'src/app/models/User';
import { TokenResponse } from './../models/TokenReponse';
import { Observable } from 'rxjs';
import { LoginRequest } from './../models/LoginRequest';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly rootURL: string = `${environment.baseUrl}/auth`;


  constructor(private http:HttpClient) { }

  public authUser(loginRequest: LoginRequest): Observable<TokenResponse>{

    return this.http.post<TokenResponse>(`${this.rootURL}/authenticate`, loginRequest)
  }

  public logIn(token: string): void{
      localStorage.setItem('token',token);
  }

  public isLogged(): boolean {
    const token: string | null = localStorage.getItem('token');

    return !token ? false : true;
  }

  public logOut(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }

  public getToken(): string | null {
    return localStorage.getItem('token');
  }

  public setUser(user: User): void{
    localStorage.setItem('user', JSON.stringify(user));
  }

  public getUser(): User | null {
    const strUser: string | null = localStorage.getItem('user');

    if(!strUser){
      this.logOut;
      return null;
    }

    return JSON.parse(strUser)
  }

  public getUserRole(): string {
    const user: User | null = this.getUser()

    return user !=null && user?.role ? user.role : "NOT ROLE";
  }

  public getCurrentUser(): Observable<User> {
    return this.http.get<User>(`${this.rootURL}/current-user`)
  }
}
