import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Users } from '../../Model/Users';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  url = "http://localhost:52103/Token/auth"
  tokenHeader = new HttpHeaders({'Authorization':'Bearer '+localStorage.getItem('token')})

  constructor(private httpClient: HttpClient) { }

  login(formData){
    return this.httpClient.post(this.url, formData);
  }

  getUsers(){
    var Url = "http://localhost:52103/api/UserProfile";
    return this.httpClient.get(Url)
  }
}
