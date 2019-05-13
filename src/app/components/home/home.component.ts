import { Color } from '../../Model/Color';
import { RosterServiceService } from '../../Core/services/roster-service.service';
import { Roster } from '../../Model/Roster';
import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../Core/services/color.service';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';
import { Users } from 'src/app/Model/Users';


@Component({
  selector: 'app-roster',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
  export class HomeComponent implements OnInit {

    rosterList: Roster[];
    User;
    colorList: Color[];
    isRoster: boolean = false;
    isColor: boolean = false;
    isEdit: boolean = false;

    constructor(
      private router: Router,
      private auth: AuthService) {
      
      }

      switchTab(tab: number) {
        this.isRoster = tab === 1;
        this.isColor = tab === 2;
      }

      ngOnInit() {
         this.auth.getUsers().subscribe(
           res => {
             this.User = res;
             console.log(this.User);
           },
           err => {
             console.log(err);
           }
         )

      }

      onLogout(){
        localStorage.removeItem('token');
        this.router.navigate(['/login'])
      }
    }
