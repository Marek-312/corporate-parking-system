import {inject}from "@angular/core"
import { CanActivateFn } from "@angular/router"
import { AuthService } from "./auth.service";
import { Router } from "express";

export const authGuard:CanActivateFn=()=>
    inject(AuthService).isLoggedIn()?true:inject(Router).createUrlTree(['/login']);
;