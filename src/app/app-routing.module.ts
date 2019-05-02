import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimerComponent } from './timer/timer.component';
import { NotGaurd } from './not.gaurd';
import { AuthGaurd } from './auth.gaurd';
import { StatsComponent } from './stats/stats.component';
import { ActivityComponent } from './activity/activity.component';

const routes: Routes = [
  {
    path : '',
    redirectTo : '/login/login',
    pathMatch : 'full'
  },
  {
    path : 'login/:form',
    component : LoginComponent,
    canActivate : [NotGaurd]
  },
  {
    path : 'dashboard',
    component : DashboardComponent,
    canActivate : [AuthGaurd],
    children : [
      {
        path : '',
        redirectTo : 'timer',
        pathMatch : 'full'
      },
      {
        path : 'timer',
        component : TimerComponent
      },
      {
        path : 'stats',
        component : StatsComponent
      },
      {
        path : 'activity',
        component : ActivityComponent
      },
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
