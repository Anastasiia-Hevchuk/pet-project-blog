import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FbAuthResponse, User } from 'src/app/shared/interfaces';
import { Observable, Subject, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError, tap } from 'rxjs/operators'


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public error$: Subject<string> = new Subject<string>()

    constructor(private http: HttpClient) {

    }

    login(user: User): Observable<any> {
        user.returnSecureToken = true;
        return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`, user)
            .pipe(
                // @ts-ignore
                tap(this.setToken),
                                // @ts-ignore
                catchError(this.handleError.bind(this))
            )
    }

    logout() {
        this.setToken(null);
    }

    isAuthenticated(): boolean {
        return !!this.token;
    }

    get token(): string | null {
        //@ts-ignore
        const expDate = new Date(localStorage.getItem('fb-token-exp'))
        if (new Date() > expDate) {
            this.logout()
            return null
        }

        return localStorage.getItem('fb-token')
    }

    private setToken(res: FbAuthResponse | null) {

        if (res) {
         // @ts-ignore
            const expDate = new Date(new Date().getTime() + (res.expiresIn*1000))
            localStorage.setItem('fb-token', res.idToken)
            localStorage.setItem('fb-token-exp', expDate.toString())
        }
        else {
            localStorage.clear()
        }

    }

    private handleError(error: HttpErrorResponse){
        const {message} = error.error.error

        console.log(message);

        switch (message) {
            case 'INVALID_EMAIL':
                this.error$.next('Invalid email')
                break
            case 'INVALID_PASSWORD':
                this.error$.next('Invalid password')
                break
            case 'EMAIL_NOT_FOUND':
                this.error$.next('Email not found')
                break
        }
        return throwError(error)
    }
    
}