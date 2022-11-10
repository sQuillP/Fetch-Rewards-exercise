import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";


/*
    Prevent any users from accessing the successful creation page 
    without creating an employee.
*/

@Injectable()
export class SuccessfulCreationGuard implements CanActivate{

    constructor(private router:Router){}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
        console.log('in canactivate')
        console.log(this.router.getCurrentNavigation().extras.state);
        if(!this.router.getCurrentNavigation().extras.state){
            console.log(this.router.getCurrentNavigation().extras.state);
            this.router.navigate(["/create-user"]);
            return false;
        }

        return true;
    }
}