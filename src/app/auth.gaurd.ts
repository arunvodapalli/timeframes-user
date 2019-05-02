import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { services } from './services/services';

@Injectable()
export class AuthGaurd implements CanActivate {
    constructor(private service: services, private router: Router) { }

    canActivate() {
        if (this.service.checkUser()) {
            return true;
        } else {
            this.router.navigate(['/login/login']);
            return false;
        }
    }
}