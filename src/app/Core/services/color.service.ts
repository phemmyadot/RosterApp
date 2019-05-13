import { Color } from '../../Model/Color';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ColorService {

  colorList: Color[];

  url: string = 'http://localhost:52103/api/colors';
  constructor(private httpClient: HttpClient) { }

  getColor(){
    return this.httpClient.get(this.url)
    .subscribe(res => this.colorList = res as Color[]);
  } 

  postColor(colorList: Color[]) {
      return this.httpClient.post(this.url, colorList);
  }

  deleteColor(ColorID: Number) {
    return this.httpClient.delete(`${this.url}/${ColorID}`);
  }

}
