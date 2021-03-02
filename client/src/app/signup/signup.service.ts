import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { SignUpResponseModel } from './signupresponse.model';
import { UserCredentials } from '../login/login.model';

@Injectable({
  providedIn: 'root',
})
export class SignUpService {
    constructor(private http: HttpClient) { }
    /**
     * @memberof SignUpService
     * used for registering a user
     * @param clientCredentials
     */
    registerUser(clientCredentials: UserCredentials): Observable<SignUpResponseModel> {
      return this.http.post<SignUpResponseModel>(`http://localhost:3000/users/register`, clientCredentials, {withCredentials: true}).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @memberof SignUpService
   * used for logging in with facebook
   */
  validateLoginFB() {
    return this.http.get(`http://localhost:3000/auth/facebook`, {withCredentials: true}).pipe(
      map((res: any) => {
        console.log(res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @memberof SignUpService
   * used for logging in with google
   */
  validateLoginGoogle() {
    return this.http.get(`http://localhost:3000/getuser`, {withCredentials: true}).pipe(
      map((res: any) => {
        console.log('loged in user ',res);
        return res;
      }),
      catchError(this.handleError)
    );
  }

  /**
   * @memberof LogInService
   * Error handler for API calls
   */
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
