import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NoteService } from '../note.service';

@Component({
  selector: 'app-create-notes',
  templateUrl: './create-notes.component.html',
  styleUrls: ['./create-notes.component.css']
})
export class CreateNotesComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;

  isValid: boolean;

  _errorMessage: string;

  constructor(private formBilder: FormBuilder, private noteService: NoteService) {
    this.formGroup = this.formBilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required]
    })
    this.formGroup.valueChanges.subscribe(() => this.isValid = false)
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {}

  saveData() {
    if (this.formGroup.valid) {
      this.noteService.saveNote(this.formGroup.value)
      this.formGroup.reset()
    } else {
      this.isValid=true
    }
  }

  get errorMessage() {
    if (this.formGroup.get('title').errors) {
      for (let param in this.formGroup.get('title').errors) {

        return NoteService.getValidatorErrorMessage(param)
      }

    }
    else if (this.formGroup.get('description').errors) {
      for (let param in this.formGroup.get('description').errors) {

        return NoteService.getValidatorErrorMessage(param)
      }
    }
  }

}
