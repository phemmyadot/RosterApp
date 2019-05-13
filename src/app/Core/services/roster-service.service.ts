import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Roster } from '../../Model/Roster';

@Injectable({
  providedIn: 'root'
})
export class RosterServiceService {

  rosterList: Roster[];
  url: string = 'http://localhost:52103/api/rosters';
  
  constructor(private httpClient: HttpClient) { }

  getAllRoster() {
    return this.httpClient.get(this.url)
    .subscribe(res => this.rosterList = res as Roster[]);
  } 

  postRoster(rosterList: Roster[]) {
    return this.httpClient.post(this.url, rosterList);
}
  
  deleteRoster(RosterID: Number) {
    return this.httpClient.delete(`${this.url}/${RosterID}`);
  }

  putRoster(roster: Roster[], RosterID) {
    return this.httpClient.put(`${this.url}/${RosterID}`, roster);
  }
}
