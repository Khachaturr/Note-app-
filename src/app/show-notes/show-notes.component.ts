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

  formGroupforShowNote: FormGroup;

  isshow: number;

  

  constructor(private formBilder: FormBuilder, private noteService: NoteService) {
    this.formGroupforShowNote = this.formBilder.group({
      titleShowNotes: ['', [Validators.required, Validators.maxLength(255)]],
      descriptionShowNotes: ['', Validators.required]
    })

    this.noteService.send.subscribe(data => this.dataNote= [...data])
   }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
     this.noteService.send.unsubscribe
  }

  openEditsection(){

  };

  deleteNote() {

  };

  remuveNotes() {

  }


}
