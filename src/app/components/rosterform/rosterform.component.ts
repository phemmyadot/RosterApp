import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ColorService } from 'src/app/Core/services/color.service';
import { RosterServiceService } from 'src/app/Core/services/roster-service.service';

@Component({
  selector: 'app-rosterform',
  templateUrl: './rosterform.component.html',
  styleUrls: ['./rosterform.component.css']
})
export class RosterformComponent implements OnInit {

  formData: FormGroup;
  constructor(
    private colorService: ColorService,
    private fb: FormBuilder,
    private rosterService: RosterServiceService,
    public dialogRef: MatDialogRef<RosterformComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }

    onSubmitRoster(roster) {
      console.log('roster', roster.value);
      this.rosterService.postRoster(roster.value).subscribe(
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
      this.formData = this.fb.group({
      RosterName: ['', Validators.required],
      RosterDescription: ['', Validators.required],
      ColorName: ['', Validators.required]
    })
  }

}
