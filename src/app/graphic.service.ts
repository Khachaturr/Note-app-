import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Note } from './note.service';

interface graphicData {
  times: string[]
  count: number[]
}

@Injectable({
  providedIn: 'root'
})
export class GraphicService {

  graphicMilisecondsTime: Array<number> = [];

  graphicNotesCount: Array<number> = [];

  graphicTimes: Array<string> = [];

  graphicData: graphicData = {
    times: [],
    count: []
  }

  sendGraphicData = new BehaviorSubject<graphicData>(this.graphicData)

  constructor(private datePipe: DatePipe) { }

  tims(data: Note[]) {
    if (data.length > 0) {
      let lastNoteTime = data[data.length - 1].date;
      this.timereduse(lastNoteTime);
      this.noteCountofTime(data);
      this.formatDate(this.graphicMilisecondsTime)
      this.addgraphicData()

    }else{
      this.graphicData.count = [];
      this.graphicData.times = [];
      this.sendGraphicData.next(this.graphicData)
    }
  }

  timereduse(data) {
    this.graphicMilisecondsTime = []
    for (let i = 0; i < 6; i++) {
      let time = data - (10000 * i);
      this.graphicMilisecondsTime.push(time)
    }
  }

  noteCountofTime(data: Note[]) {
    this.graphicNotesCount = []
    for (let i = 0; i < this.graphicMilisecondsTime.length; i++) {
      let num = data.filter((data) => Number(data.date) <= this.graphicMilisecondsTime[i])
      this.graphicNotesCount.push(num.length)
    }
  }

  formatDate(data: Array<number>) {
    const fullTime: Array<string> = data.map((time) => this.datePipe.transform(time, "HH:mm:ss"))
    this.graphicTimes = [...fullTime]
  }


  addgraphicData(){
    this.graphicData.times = [...this.graphicTimes.reverse()]
    this.graphicData.count = [...this.graphicNotesCount.reverse()]
    this.sendGraphicData.next(this.graphicData)
  }

}
