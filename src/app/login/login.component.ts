import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { services } from '../services/services';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form : string = 'login'
  mobile : string
  password : string
  name : string
  showSpinner : boolean = false

  constructor(
    private route: ActivatedRoute, 
    private services : services,
    private router : Router
    ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.form = params.form.toLowerCase()
    })
  }

  signupClick(){
    this.form = 'signup'
    this.mobile = ''
    this.password = ''
    this.name = ''
  }

  loginClick(){
    this.form = 'login'
    this.mobile = ''
    this.password = ''
    this.name = ''
  }

  register(){
    if(this.mobile){
      if(this.password){
        const data = {
          mobile : this.mobile,
          password : this.password,
          name : this.name,
        }
        this.showSpinner = true
        this.services.register(data).subscribe(result => {
          this.showSpinner = false
          if(result.success){
            this.login()
          }
          else{
            alert(result.msg)
          }
        })
      }
      else{
        alert('Please enter password')        
      }
    }
    else{
      alert('Please enter mobile number')
    }
  }

  login(){
    if(this.mobile){
      if(this.password){
        const data = {
          mobile : this.mobile,
          password : this.password,
        }
        this.showSpinner = true
        this.services.login(data).subscribe(result => {
          this.showSpinner = false
          if(result.success){
            this.services.storeData(result.token,result.user)
            this.router.navigate(['dashboard'])
          }
          else{
            alert(result.msg)
          }
        })
      }
      else{
        alert('Please enter password')        
      }
    }
    else{
      alert('Please enter mobile number')
    }
  }

  preventChars(e){
    if(!(e.keyCode >= 48 && e.keyCode <= 57)){
      e.preventDefault()
    }
  }
}
