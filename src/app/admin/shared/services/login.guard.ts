import { Injectable } from "@angular/core";
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router} from "@angular/router";
import {Observable} from "rxjs";
import { AuthService } from "./auth.service";

@Injectable()

export class LoginGuard implements CanActivate{

    constructor(private auth:AuthService, private router: Router){}
//@ts-ignore
	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : Observable<boolean> | boolean{
        if(this.auth.isAuthenticated()){
            this.router.navigate(['/admin', 'dashboard'])
        }else{
            return true
        }
		

	}
}