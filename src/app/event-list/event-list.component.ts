import { Component, OnInit } from '@angular/core';
import { EventService } from '../event.service';
import { Observable } from 'rxjs';
import { DragulaService } from 'ng2-dragula';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {

  term: string = '';

  event: any;

  events: Observable<any[]>;

  deleteDialog: any;

  constructor(public eventService: EventService, public dragulaService: DragulaService) {
    this.events = eventService.getEvents();

    dragulaService.drag().subscribe((value) => {
      console.log("drag")
      console.log(value)
    });

    dragulaService.drop().subscribe((value) => {
      console.log("drop")
      console.log(value)
    });
  }

  ngOnInit(): void {
    this.deleteDialog = document.getElementById("deleteDialog") as HTMLDialogElement;
  }

  onDelete(event: any){
    this.event = event;

    this.deleteDialog.showModal();
  }

  onSearch(query: string) {
    this.term = query;
  }

  onCancel() {
    this.deleteDialog.close();
  }

  onConfirm() {
    this.eventService.deleteEvent(this.event);
    
    this.deleteDialog.close();
  }
}
