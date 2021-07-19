import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Note, NoteService } from '../note.service';

@Component({
  selector: 'app-show-notes',
  templateUrl: './show-notes.component.html',
  styleUrls: ['./show-notes.component.css']
})
export class ShowNotesComponent implements OnInit, OnDestroy  {

  dataNote: Note[];

  formGroup: FormGroup;

  isshow: number;

  _errorMessage: string;

  

  constructor(private formBilder: FormBuilder, private noteService: NoteService) {
    this.formGroup = this.formBilder.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', Validators.required]
    })

    this.noteService.send.subscribe(data => this.dataNote= [...data])
    this.noteService.getNotes()
    
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
     this.noteService.send.unsubscribe()
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

  openEditsection(i, item:Note) {
    if(item != undefined){
      this.formGroup.get('title').patchValue(item.title)
      this.formGroup.get('description').patchValue(item.description)
      this.isshow = i

    }else{
      this.isshow = i
    }
  }

  deleteNote(item: Note){
    this.noteService.deleteNote(item)

  }

  remuveNotes(item:Note){
    if(this.formGroup.valid){
      this.noteService.remuveNote(this.formGroup.value, item.id)
      this.isshow= NaN
    }
  }


}
