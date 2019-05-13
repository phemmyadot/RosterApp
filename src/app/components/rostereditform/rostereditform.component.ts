import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Roster } from '../../Model/Roster';
import { ColorService } from 'src/app/Core/services/color.service';
import { RosterServiceService } from 'src/app/Core/services/roster-service.service';

@Component({
  selector: 'app-rostereditform',
  templateUrl: './rostereditform.component.html',
  styleUrls: ['./rostereditform.component.css']
})
export class RostereditformComponent implements OnInit {

  
  public formData: Roster;

  constructor(
    private colorService: ColorService,
    private rosterService: RosterServiceService,
    public dialogRef: MatDialogRef<RostereditformComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    updateRoster(content, RosterID) {
      RosterID = this.formData.RosterID;
      this.rosterService.putRoster(content.value, RosterID).subscribe(
        (res) => {
          this.rosterService.getAllRoster();
          this.dialogRef.close();
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      )
    }
    
  ngOnInit() {
      this.colorService.getColor();
      if(this.data.index == null)
      this.formData = {
        RosterID: this.data.roster.RosterID,
        RosterName: this.data.roster.RosterName,
        RosterDescription: this.data.roster.RosterDescription,
        ColorName: this.data.roster.ColorName
      }
      else
      this.formData = Object.assign({}, this.rosterService.rosterList[this.data.roster]);
  }
}
