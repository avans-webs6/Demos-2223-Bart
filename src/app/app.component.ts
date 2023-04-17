import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Festivals';

  events: any[] = [];

  showCreate = false;

  constructor() {
    this.events = [
      { name: 'Best Kept Secret', location: 'Beekse Bergen', date: '9-juni-2023'},
      { name: 'Pinkpop', location: 'Landgraaf', date: '16-juni-2023'},
      { name: 'Down the Rabbit Hole', location: 'Beuningen', date: '1-juli-2023'}
    ];

    this.events = JSON.parse(localStorage.getItem('events') ?? '[]');
  
    localStorage.setItem('events', JSON.stringify(this.events));
  }

  onCreate() {
    this.showCreate = !this.showCreate;
  }

  onSaved() {
    this.events = JSON.parse(localStorage.getItem('events') ?? '[]');
  }
}
