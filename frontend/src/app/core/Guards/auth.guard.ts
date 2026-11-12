import { CanActivateFn,Router } from "@angular/router";
import { Inject } from "@angular/core";
import{Store} from "@ngrx/store";
import {map,take} from "rxjs";
//import {selectAuthe}
export class RolesGuard implements CanActivate{
    constructor(){}
    canActivate(context:Excecution): MaybeAsync<GuardResult> {
        
    }
}