import { Component, OnInit } from '@angular/core';
import { services } from '../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.css']
})
export class TimerComponent implements OnInit {

  seconds : number = 0
  minutes : number = 0
  duration : number = 0
  started : boolean = false
  paused : boolean = false
  description : string
  startTime
  endTime
  timer
  user: any;
  showSpinner : boolean

  constructor(
    private services : services,
    private router : Router
    ) { }

  ngOnInit() {
  }

  isUserLoggedIn() {
    const user = JSON.parse(this.services.checkUser())
    if (user) {
      this.user = user
      return true;
    }
    else {
      return false;
    }
  }

  start(){
    if(!this.started){
      this.started = true
      this.startTime = new Date()
      this.timer = setInterval(() => {
        ++this.seconds
        ++this.duration
        if(this.seconds === 5){
          ++this.minutes
          this.seconds = 0
        }
      },1000)
    }
  }

  pause(){
    this.endTime = new Date()
    clearTimeout(this.timer)
    this.paused = true
  }
  
  reset(){
    clearTimeout(this.timer)
    this.seconds = 0
    this.minutes = 0
    this.started = false
    this.paused = false;
  }
  
  cancel(){
    this.paused = false;
  }

  submit(){
    if(this.isUserLoggedIn()){
      const data = {
        user : this.user._id,
        duration : this.duration,
        description : this.description,
        start_time : this.startTime,
        end_time : this.endTime
      }
      this.showSpinner = true
      this.services.recordTime(data).subscribe(result => {
        this.showSpinner = false
        if(result.success){
          this.paused = false
          this.description = ''
        }
        else{
          alert(result.msg)
        }
      })
    }
    else{
      this.services.logout();
      this.router.navigate(['/login'])
    }
  }

}
