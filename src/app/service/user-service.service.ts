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

  private readonly url: string = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) { }

  getAllUser(): Observable<Object>{
    return this.http.get(this.url);
  }

  saveUser(user: User): Observable<Object> {
    return this.http.post(this.url,user);
  }
}
