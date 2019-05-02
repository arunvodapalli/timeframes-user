import { Component, OnInit } from '@angular/core';
import { services } from '../services/services';
import { Router } from '@angular/router';
declare var Highcharts: any
@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  showSpinner
  noData
  user
  timeFrames
  months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December'
  ]

  constructor(
    private services : services,
    private router : Router
    ) { }

  ngOnInit() {
    this.getAtivity()
    
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

  getAtivity(){
    if(this.isUserLoggedIn()){
      this.showSpinner = true
      this.services.getAtivity(this.user._id).subscribe(result => {
        this.showSpinner = false
        if(result.success){
          this.timeFrames = result.msg
          var series = []
          var categories = []
          result.msg.forEach((t) => {
            series.push({
              name : this.months[t._id.month-1],
              data : [t.total_duration]
            })
            categories.push(t._id.year)
          }) 
          this.chart(series,categories)
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

  chart(series,categories){
    console.log(series)
    Highcharts.chart('container', {
      chart: {
        type: 'column'
      },
      title: {
          text: 'Activity Chart'
      },
  
      yAxis: {
          title: {
              text: 'Total Duration'
          }
      },

      xAxis: {
        categories: categories
      },
      
      plotOptions: {
        line: {
            dataLabels: {
                enabled: true
            },
            enableMouseTracking: false
        }
      },
      series: series,

      responsive: {
          rules: [{
              condition: {
                  maxWidth: 500
              },
              chartOptions: {
                  legend: {
                      layout: 'horizontal',
                      align: 'center',
                      verticalAlign: 'bottom'
                  }
              }
          }]
      }
  
    });
  }

}
