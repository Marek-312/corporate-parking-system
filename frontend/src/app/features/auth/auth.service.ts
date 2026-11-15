import { HttpClient } from '@angular/common/http';
import { inject, Inject, Injectable} from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { AuthUser, RegisterRequest } from './auth.model';
import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

@Injectable({providedIn:'root'})
export class AuthService{
    private readonly http = inject(HttpClient);
        private readonly router =inject(Router);
        private readonly tokenKey='acces_token';
        private readonly isBrowser=isPlatformBrowser(inject(PLATFORM_ID));

    
    
    login(email:string,password:string){
        return this.http.post<{accesToken:string}>(`${environment.apiUrl}/auth/login`,{email,password})
        .pipe(tap((res)=>{if(this.isBrowser)localStorage.setItem(this.tokenKey,res.accesToken)}));

    }

    register(data:RegisterRequest){
        return this.http.post(`${environment.apiUrl}/auth/register`,data);

    }


    me() {
    return this.http.get<AuthUser>(`${environment.apiUrl}/auth/me`);
  }




    logout(): void {
        if (this.isBrowser){
        localStorage.removeItem(this.tokenKey);
        this.router.navigate(['/login']);}
    }

    getToken(): string | null {
        return this.isBrowser? localStorage.getItem(this.tokenKey):null;
    }

    isLoggedIn(): boolean {
        return this.getToken() !== null;
    }
}

