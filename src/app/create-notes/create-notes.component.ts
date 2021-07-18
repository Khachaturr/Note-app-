import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css']
})
export class CreateNotesComponent implements OnInit {

  formGroup: FormGroup;

  constructor(private formBilder: FormBuilder,) {
    this.formGroup = this.formBilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required]
    })
   }

  ngOnInit(): void {
  }

  saveData() {}

}
