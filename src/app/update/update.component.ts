import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UsernameService } from '../username.service';
import { Router } from '@angular/router';

@Component({
  selector: 'update',
  templateUrl: './update.component.html',
  styleUrls: ['./update.component.css']
})
export class UpdateComponent implements OnInit {

  constructor(private httpClient: HttpClient,
              private router: Router,
              private data: UsernameService) { }

  email: string;
  password: string;
  age: number;
  height: number;
  weight: number;
  goals: number;
  push_ups: number;
  squats: number;
  miles: number;
  username: string;
  sex: string;
  user;

  updateSex() {
    var inputValue = (<HTMLInputElement>document.getElementById('sex')).value;
    this.sex = inputValue;
  }

  updateEmail(e) {
    this.email = e.target.value;
  }

  updatePassword(e) {
    this.password = e.target.value;
  }

  updateAge(e) {
    this.age = e.target.value;
  }

  updateHeight(e) {
    this.height = e.target.value;
  }

  updateWeight(e) {
    this.weight = e.target.value;
  }
  
  updateGoals() {
    var inputValue = parseInt((<HTMLInputElement>document.getElementById('goalId')).value);
    this.goals = inputValue;
  }

  updatePushUps(e) {
    this.push_ups = e.target.value;
  }

  updateSquats(e) {
    var inputValue = parseInt((<HTMLInputElement>document.getElementById('squats')).value);
    this.squats = inputValue;
  }

  updateMiles(e) {
    this.miles = e.target.value;
  }

  updateUsername(e) {
    this.username = e.target.value;
  }

  getCookieInfo() {
    return new Promise((resolve, reject) => {
      const cookie = document.cookie;
      const emailArr = cookie.split('=');
      const email = emailArr[emailArr.length - 1];
      return this.httpClient.get('/username', {
        params: {
          user: email
        }
      })
        .subscribe(user => {
          if (user) {
            resolve(user)
          } else {
            reject('user rejection')
          }
        },
          error => {
            console.error(error, 'error');
          })
    })
  }

  nutritional() {
    this.router.navigate(['/diet']);
  }

  launch(){
    this.getCookieInfo()
    .then(user=>{
      this.user = user
      this.age = this.user.age;
      this.weight = this.user.weight;
      this.goals = this.user.goals;
      this.push_ups = this.user.num_push_ups;
      this.squats = this.user.squat_comf;
      this.miles = this.user.jog_dist;
      this.username = this.user.preferred_username;
    })
  }

  ngOnInit() {
    this.launch()
  }

  newUsername() {
    this.data.changeUsername(this.username);
  }
}


