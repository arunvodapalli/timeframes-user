import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { services } from './services/services';

@Injectable()
export class NotGaurd implements CanActivate {
    constructor(private service: services, private router: Router) { }

    canActivate() {
        if (this.service.checkUser()) {
            this.router.navigate(['/dashboard']);
            return false;
        } else {
            return true;
        }
    }
}