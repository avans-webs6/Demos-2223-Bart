import { Component, OnInit, Input } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  @Input()
  events: any[] = [];

  constructor(public eventService: EventService) {
    eventService.getEvents().subscribe((events: any[]) => {
      this.events = events;
    })
  }

  ngOnInit(): void {
  }

}
