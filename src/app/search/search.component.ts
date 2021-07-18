import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchFormGroup:FormGroup;

  constructor() {
    this.searchFormGroup=new FormGroup({
      search: new FormControl('')
    })
   }

  ngOnInit(): void {
  }

  search(){
    
  }

}
