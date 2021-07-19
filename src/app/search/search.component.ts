import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { NoteService } from '../note.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {

  searchFormGroup:FormGroup;

  notifier = new Subject();

  constructor(private noteService: NoteService) {
    this.searchFormGroup=new FormGroup({
      search: new FormControl('')
    })
   }

  ngOnInit(): void {
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

  search(){
    this.searchFormGroup.valueChanges.pipe(takeUntil(this.notifier)).pipe(debounceTime(1000))
    .subscribe(data=>this.noteService.filtrNote(data.search))
  }

}
