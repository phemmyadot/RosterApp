import { Component, OnInit, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { ColorService } from 'src/app/Core/services/color.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-colorform',
  templateUrl: './colorform.component.html',
  styleUrls: ['./colorform.component.css']
})
export class ColorformComponent implements OnInit {

  formData: FormGroup;
  constructor(
    private fb: FormBuilder,
    private colorService: ColorService,
    public dialogRef: MatDialogRef<ColorformComponent>,
    @Inject(MAT_DIALOG_DATA) public data) { }
    

    onSubmitColor(color) {
      console.log(color.value);
      this.colorService.postColor(color.value).subscribe(
        (res) => {
          this.colorService.getColor();
          this.dialogRef.close();
          color.reset();
        },
        (err) => {
          console.error(err);
        }
      ) 
    }

  ngOnInit() {
    this.formData = this.fb.group({
      ColorName: ['', Validators.required],
      ColorCode: ['', Validators.required]
    })
  }

}
