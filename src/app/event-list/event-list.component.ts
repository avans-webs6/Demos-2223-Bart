import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: Observable<any[]>;

  constructor(public eventService: EventService) {
    this.events = eventService.getEvents();
  }

  ngOnInit(): void {
  }
}
