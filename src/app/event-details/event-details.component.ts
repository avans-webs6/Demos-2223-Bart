import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  event: any;
  
  constructor(private service: EventService, private route: ActivatedRoute) {
    service.getEvent(this.route.snapshot.paramMap.get('id')).subscribe((event: any) => {
      this.event = event;
    });
   }

  ngOnInit(): void {
  }

}
