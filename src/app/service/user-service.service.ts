import { NewUserRequest } from 'src/app/models/NewUserRequest';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User} from 'src/app/models/User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly rootURL: string = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<User[]>{
    return this.http.get<User[]>(this.rootURL);
  }

  saveUser(newUserRequest: NewUserRequest): Observable<User> {
    return this.http.post<User>(this.rootURL, newUserRequest);
  }

  emailExist(email: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.rootURL}/check/email/${email}`);
  }

  usernameExist(username: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.rootURL}/check/username/${username}`);
  }

  telephoneExist(telephone: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.rootURL}/check/telephone/${telephone}`);
  }
}
