import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  events: any[] = [];

  constructor() {
    this.events = [
      { name: 'Best Kept Secret', location: 'Beekse Bergen', date: '9-juni-2023'},
      { name: 'Pinkpop', location: 'Landgraaf', date: '16-juni-2023'},
      { name: 'Down the Rabbit Hole', location: 'Beuningen', date: '1-juli-2023'}
    ];

    this.events = JSON.parse(localStorage.getItem('events') ?? '[]');

    localStorage.setItem('events', JSON.stringify(this.events));
  }

  ngOnInit(): void {
  }

}
