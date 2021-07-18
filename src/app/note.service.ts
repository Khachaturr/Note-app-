import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Note {
  title: string;
  description: string;
  date: Date
  id: number
}

@Injectable({
  providedIn: 'root'
})
export class NoteService {

  notesdata: Note[] = [];

  send = new BehaviorSubject<Note[]>(this.notesdata);

  constructor(private http: HttpClient) { }

  saveNote(data) {
    let note: Note = {
      ...data,
      data: Date.now(),
      id: NaN
    }

    this.sendDataServer(note).toPromise<Note>()
    .then(data => {
      this.notesdata.push(data)
      this.sendsData(this.notesdata)
    })
    .catch(error => {
      alert("Failed to save note")
    })
  };

  sendDataServer(data: Note)  {
    return this.http.post<Note>("http://localhost:9000/api/notes", { ...data })
  };

  sendsData(data: Note[]) {
    this.send.next(data)
  };

  static getValidatorErrorMessage(validatorName: string) {
    let config = {
      required: 'Required',
      maxlength: 'Max length for title 255'

    }
    return config[validatorName]
  }

}
