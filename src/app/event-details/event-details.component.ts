import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  @Input()
  event: any;
  
  constructor(private service: EventService, private route: ActivatedRoute) {
    service.getEvents().subscribe((events: any[]) => {
      this.event = events.find((e: any) => e.name === this.route.snapshot.paramMap.get('name'));
    });
   }

  ngOnInit(): void {
  }

}
