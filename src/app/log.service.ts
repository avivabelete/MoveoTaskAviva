import { HttpClient } from '@angular/common/http';
import { Injectable, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from './activity';

@Injectable({
  providedIn: 'root'
})
export class LogService implements OnInit{

  url = 'http://localhost:3000/';
  headers = { 'content-type': 'application/json'}  
 
  constructor(private http: HttpClient) {}
  ngOnInit(): void {}

  getActivities(): Observable<any>{
    return this.http.get(`${this.url}activities`,{'headers':this.headers});
  }
  addActivity(activity){
    const body=JSON.stringify(activity);
    return this.http.post(`${this.url}activities`, body, {'headers':this.headers});
  }
  deleteSession(id){
    return this.http.delete(`${this.url}activities/${id}`, {'headers':this.headers});
  }
}
