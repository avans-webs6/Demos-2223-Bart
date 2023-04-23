import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { EventService } from '../event.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  @Output()
  saved = new EventEmitter();

  event: any = {};

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
  }

  saveEvent() {
    this.eventService.addEvent(this.event);

    this.event = {};

    this.saved.emit();
  }
}
