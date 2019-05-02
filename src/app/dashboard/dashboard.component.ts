import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { services } from '../services/services';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(
    private services : services,
    private router : Router
  ) { }

  ngOnInit() {
  }

  logout(){
    this.services.logout();
    this.router.navigate(['/login/login'])
  }

}
