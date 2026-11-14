import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthUser, RegisterRequest } from './auth.model';


@Injectable({providedIn:'root'})
export class AuthService{
    constructor(
        private readonly http=inject(HttpClient),
        private readonly router =inject(Router),
        private readonly tokenKey='acces_token',
    ){}
    
    
    login(email:string,password:string){
        return this.http.post<{accesToken:string}>(`${environment.apiUrl}/auth/login`,{email,password})
        .pipe(tap((res)=>localStorage.setItem(this.tokenKey,res.accesToken)));

    }

    register(data:RegisterRequest){
        return this.http.post(`${environment.apiUrl}/auth/register`,data);

    }

    logout(): void {
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/login']);
    }

    getToken(): string | null {
        return localStorage.getItem(this.tokenKey);
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }
}

