import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input()
  event: any;
  
  constructor(private route: ActivatedRoute) {
    this.event = this.getEvent();
   }   

  getEvent(){
    let events = JSON.parse(localStorage.getItem('events') ?? '[]');
    let event = events.find((e: any) => e.name === this.route.snapshot.paramMap.get('name'));
    return event;
  }

  ngOnInit(): void {
  }

}
