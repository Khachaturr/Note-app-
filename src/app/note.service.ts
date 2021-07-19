import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Note {
  title: string;
  description: string;
  date: Date;
  id: number;
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
      date: Date.now(),
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

  remuveNote(item, id) {
    console.log(this.notesdata)
    let index = this.notesdata.findIndex((data) => data.id === id);
    item.date = this.notesdata[index].date;
    item.id = this.notesdata[index].id
    console.log(item)

    this.changeDataServer(item).toPromise<Note>()
    .then(data => {
    this.notesdata[index].description = item.description
    this.notesdata[index].title = item.title
    this.sendsData(this.notesdata)
    })
    .catch(error => {
      alert("Failed to save note")
    })
  };


  changeDataServer(data: Note)  {
    return this.http.put<Note>(`http://localhost:9000/api/notes/:${data.id}`, { ...data })
  };


  deleteNote(item) {

    this.deleteNoteInServer(item.id).toPromise<Note>()
    .then(data => {
      let index = this.notesdata.findIndex((data) => data.id === item.id)
      this.notesdata.splice(index, 1)
      this.sendsData(this.notesdata)    
    })
    .catch(error => {
      alert("Failed to delete note")
    })
  };

  deleteNoteInServer(id){
    return this.http.delete<Note>(`http://localhost:9000/api/notes/:${id}`)
  };

  getNotes(){

    this.getNotesFromServer().toPromise<any>()
    .then(data => {
      this.notesdata=[...data.notes]
      this.sendsData(this.notesdata)    
    })
    .catch(error => {
      alert("Failed to get notes")
    })
  };

  getNotesFromServer(){
    return this.http.get<any>(`http://localhost:9000/api/notes`)
  };


  filtrNote(data) {
    if(data){
      let filterNotes = this.filter(data)
     this.sendsData(filterNotes)
    }else{
      this.sendsData(this.notesdata)
    }
  };

  filter(note) {
    console.log(777,note)    
      return this.notesdata.filter((el) => {
        if(el.title.toLowerCase().indexOf(note.toLowerCase()) > -1 ||
         el.description.toLowerCase().indexOf(note.toLowerCase())> -1){
          return el
        };
      })
  };

}
