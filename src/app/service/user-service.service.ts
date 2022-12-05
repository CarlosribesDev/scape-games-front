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

  saveUser(user: User): Observable<User> {
    return this.http.post<User>(this.rootURL, user);
  }

  emailExist(email:string): Observable<boolean> {
    return this.http.get<boolean>(`${this.rootURL}/checkEmail/${email}`);
  }
}
