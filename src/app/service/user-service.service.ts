import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private readonly url: string = `${environment.baseUrl}/user`;

  constructor(private http: HttpClient) { }

  getAllUser(){
    return this.http.get(this.url);
  }
}
