import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { LoginModel,UserCredentials } from './login.model';

@Injectable({
  providedIn: 'root',
})
export class LogInService {
    constructor(private http: HttpClient) { }

  validateLogin(userCredentials: UserCredentials): Observable<LoginModel> {
      return this.http.post<LoginModel>(`http://localhost:3000/users/login`, userCredentials).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError('Something bad happened; please try again later.');
  }

}
