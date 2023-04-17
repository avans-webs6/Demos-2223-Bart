import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  event: any = {};

  constructor() { }

  ngOnInit(): void {
  }

  saveEvent(){
    let events = JSON.parse(localStorage.getItem('events') ?? '[]');
    events.push(this.event);
    localStorage.setItem('events', JSON.stringify(events));
    this.event = {};
  }
}
