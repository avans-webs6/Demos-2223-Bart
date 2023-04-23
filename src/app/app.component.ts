import { Component } from '@angular/core';
import { EventService } from './event.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Festivals';

  showCreate = false;

  constructor(public eventService: EventService) { }

  onClear() {
    this.eventService.clrEvents();
  }
  onCreate() {
    this.showCreate = !this.showCreate;
  }

  onSaved() {
    this.showCreate = false;
  }
}
