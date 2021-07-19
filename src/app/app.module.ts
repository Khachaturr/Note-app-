import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { CreateNotesComponent } from './create-notes/create-notes.component';
import { SearchComponent } from './search/search.component';
import { ShowNotesComponent } from './show-notes/show-notes.component';
import { HttpClientModule } from '@angular/common/http';
import { GraphicComponent } from './graphic/graphic.component';
import { ChartModule } from 'angular2-chartjs';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    AppComponent,
    CreateNotesComponent,
    SearchComponent,
    ShowNotesComponent,
    GraphicComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartModule
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent]
})
export class AppModule { }
