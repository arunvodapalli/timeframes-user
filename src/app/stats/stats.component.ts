import { Component, OnInit } from '@angular/core';
import { services } from '../services/services';
import { Router } from '@angular/router';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.css']
})
export class StatsComponent implements OnInit {

  user
  start
  end
  searchText
  timeFrames = []
  showSpinner : boolean
  noData : boolean

  constructor(
    private services : services,
    private router : Router
  ) { }

  ngOnInit() {
    this.getTimeFrames()
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

  getTimeFrames(){
    if(this.isUserLoggedIn()){
      this.showSpinner = true
      this.services.getTimeFrames(this.user._id).subscribe(result => {
        this.showSpinner = false
        if(result.success){
          this.noData = false
          this.timeFrames = result.msg
        }
        else{
          alert(result.msg)
          this.noData = true
        }
      })
    }
    else{
      this.services.logout();
      this.router.navigate(['/login'])
    }
  }

  filterFrames(){
    if(this.isUserLoggedIn()){
      const data = {
        user : this.user._id
      }
      if(this.start || this.end){
        if((this.start && this.end) && (this.end < this.start)){
          alert('End date must be smaller than start date')
        }
        else{
          this.start ? data['start'] = new Date(this.start) : delete data['start']
          this.end ? data['end'] = new Date(this.end) : delete data['end']
          this.showSpinner = true
          this.services.filterFrames(data).subscribe(result => {
            this.showSpinner = false
            if(result.success){
              this.noData = false
              this.timeFrames = result.msg
            }
            else{
              alert(result.msg)
              this.noData = true
            }
          })
        }
      }
      else{
        alert('please select atleast one filter')
      }
    }
    else{
      this.services.logout();
      this.router.navigate(['/login'])
    }
  }

}
