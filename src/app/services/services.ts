import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { map } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';

@Injectable()
export class services {
    // url = 'http://localhost:3000/user/';
    url = 'https://timefrmesnode.herokuapp.com/user/';
    options: any;

    constructor(private http: Http, private route: ActivatedRoute) { }

    storeData(token, userData) {
        localStorage.setItem('token', token)
        localStorage.setItem('user', JSON.stringify(userData))
    }
    checkUser() {
        const user = localStorage.getItem('user');
        return user;
    }
    loadToken() {
        const token = localStorage.getItem('token')
        return token;
    }
    logout() {
        localStorage.removeItem('user')
        localStorage.removeItem('token')
    }

    register(data) {
        return this.http.post(this.url + 'register', data).pipe(map(res => res.json()));
    }
    login(data) {
        return this.http.post(this.url + 'login', data).pipe(map(res => res.json()));
    }
    createHeaders() {
        const token = this.loadToken();
        this.options = new RequestOptions({
            headers: new Headers({
                'Content-Type': 'application/json',
                'authorization': token
            })
        })
    }

    recordTime(data) {
        this.createHeaders();
        return this.http.post(this.url + 'record-time', data,this.options).pipe(map(res => res.json()));
    }

    getTimeFrames(user) {
        this.createHeaders();
        return this.http.get(this.url + 'get-all-timeframes/'+user,this.options).pipe(map(res => res.json()));
    }

    filterFrames(data) {
        this.createHeaders();
        return this.http.post(this.url + 'filter-frames', data,this.options).pipe(map(res => res.json()));
    }

    getAtivity(user) {
        this.createHeaders();
        return this.http.get(this.url + 'get-activity/'+user,this.options).pipe(map(res => res.json()));
    }
}