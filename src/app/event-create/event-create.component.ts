import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-create',
  templateUrl: './event-create.component.html',
  styleUrls: ['./event-create.component.css']
})
export class EventCreateComponent implements OnInit {

  event: any = { name: "", location: "", date: "", organiser: ""};

  organisers: any;

  createDialog: any;

  constructor(public service: EventService) { }

  ngOnInit(): void {
    this.organisers = this.service.getOrganisers();

    this.createDialog = document.getElementById("createDialog") as HTMLDialogElement;
  }

  onCreate() {
    this.createDialog.showModal();
  }

  onSave() {
    this.service.addEvent(this.event);

    this.event = { name: "", location: "", date: "", organiser: ""};
    
    this.createDialog.close();
  }

  onCancel() {
    this.createDialog.close();
  }
}
