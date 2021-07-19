import { GraphicService } from './../graphic.service';
import { AfterViewInit, Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NoteService } from '../note.service';
import { ChartComponent } from 'angular2-chartjs';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit, AfterViewInit, OnDestroy {

  @ViewChild(ChartComponent) chart: ChartComponent;

  notifier = new Subject();


  type = 'line';
  data = {
    labels: [],

    datasets: [
      {
        label: "Notes creation chart",
        data: []
      }
    ]
  };
  options = {
    responsive: true,
    maintainAspectRatio: true,
  };

  constructor(private noteService: NoteService, private graphicServis: GraphicService) {

    this.noteService.send.pipe(takeUntil(this.notifier)).subscribe(data => this.graphicServis.tims(data));

    this.graphicServis.sendGraphicData.pipe(takeUntil(this.notifier))
    .subscribe(data => this.addDataInGraphic(data));
  }


  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.chart.chart.update();
  }

  ngOnDestroy() {
    this.notifier.next();
    this.notifier.complete();
  }

  addDataInGraphic(data) {
    this.data.labels = [...data.times];
    this.data.datasets[0].data = [...data.count];
    this.chart?.chart.update();

  }

}
