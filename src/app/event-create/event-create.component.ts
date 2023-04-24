import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  event: any = {};

  createDialog: any;

  constructor(public eventService: EventService) { }

  ngOnInit(): void {
    this.createDialog = document.getElementById("createDialog") as HTMLDialogElement;
  }

  onCreate() {
    this.createDialog.showModal();
  }

  onSave() {
    this.eventService.addEvent(this.event);

    this.event = {};
    
    this.createDialog.close();
  }

  onCancel() {
    this.createDialog.close();
  }
}
