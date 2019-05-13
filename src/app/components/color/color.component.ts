import { Component, OnInit } from '@angular/core';
import { ColorService } from '../../Core/services/color.service';
import { MatDialog, MatDialogConfig } from '@angular/material';
import { ColorformComponent } from '../colorform/colorform.component';

@Component({
  selector: 'app-color',
  templateUrl: './color.component.html',
  styleUrls: ['./color.component.css']
})
export class ColorComponent implements OnInit {

  constructor(
    private colorservice: ColorService,
    public dialog: MatDialog) { }

    openColorDialog(index, ColorID): void {
      const dialogConfig = new MatDialogConfig();
      dialogConfig.autoFocus = true;
      dialogConfig.disableClose = true;
      dialogConfig.width = "40%";
      dialogConfig.data = {index, ColorID};
      this.dialog.open(ColorformComponent, dialogConfig);
    }

    deleteColor(ColorID) {
      this.colorservice.deleteColor(ColorID).subscribe(
        (res) => {
          this.colorservice.getColor();
          console.log(res);
        },
        (err) => {
          console.error(err);
        }
      )
    }

  ngOnInit() {
    this.colorservice.getColor();
  }

}

