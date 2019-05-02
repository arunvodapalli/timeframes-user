import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule, Http } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NotGaurd } from './not.gaurd';
import { AuthGaurd } from './auth.gaurd';
import { FilterPipe } from './services/filter.pipe';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { services } from './services/services';
import { DashboardComponent } from './dashboard/dashboard.component';
import { TimerComponent } from './timer/timer.component';
import { StatsComponent } from './stats/stats.component';
import { ActivityComponent } from './activity/activity.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    TimerComponent,
    StatsComponent,
    FilterPipe,
    ActivityComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    HttpClientModule,
    FormsModule
  ],
  exports : [FilterPipe],
  providers: [services,NotGaurd,AuthGaurd],
  bootstrap: [AppComponent]
})
export class AppModule { }
