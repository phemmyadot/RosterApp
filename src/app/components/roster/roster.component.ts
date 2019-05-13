import { Component, OnInit, Inject } from '@angular/core';
import { RosterServiceService } from '../../Core/services/roster-service.service';
import { Roster } from '../../Model/Roster';
import { ColorService } from '../../Core/services/color.service';
import { Color } from '../../Model/Color';
import { HomeComponent } from '../home/home.component';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { RosterformComponent } from '../rosterform/rosterform.component';
import { RostereditformComponent } from '../rostereditform/rostereditform.component';
import { AuthService } from 'src/app/Core/services/auth.service';

@Component({
  selector: 'app-add-roster',
  templateUrl: './roster.component.html',
  styleUrls: ['./roster.component.css']
})
export class RosterComponent implements OnInit {
  
  rosterList: Roster[];
  colorList: Color[];
  public formData: {
    RosterID: string;
    name: string,
    description: string,
    ColorName: string
  };
  constructor(
    private rosterService: RosterServiceService,
    private colorService: ColorService,
    private rostercomponent: HomeComponent,
    public dialog: MatDialog,
    private auth: AuthService) { }

    openDialog(index, RosterID): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "40%";
      dialogConfig.data = {index, RosterID};
      this.dialog.open(RosterformComponent, dialogConfig);
    }

    openEditDialog(index, roster): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "50%";
      dialogConfig.data = {index, roster};
      this.dialog.open(RostereditformComponent, dialogConfig);
      console.log(roster);
    }

    onColorSelected(value) {
      console.log(value);
    }

    deleteRoster(RosterID) {
      console.log('rosterid',RosterID);
      this.rosterService.deleteRoster(RosterID).subscribe(
        (res) => {
          this.rosterService.getAllRoster();
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      )
    }
    ngOnInit() {
      this.colorService.getColor();
      this.rosterService.getAllRoster();
    }

}
