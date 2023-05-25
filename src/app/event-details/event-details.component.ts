import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EventService } from '../event.service';
import { FormBuilder } from '@angular/forms';
import { debounceTime } from 'rxjs';

@Component({
  selector: 'app-event-details',
  templateUrl: './event-details.component.html',
  styleUrls: ['./event-details.component.css']
})
export class EventDetailsComponent implements OnInit {

  eventForm: any;

  organiser: any;

  subscription: any;
  
  constructor(private service: EventService, private route: ActivatedRoute, private formBuilder: FormBuilder) {
   }

  ngOnInit(): void {
    let id = this.route.snapshot.paramMap.get('id');

    this.service.getEvent(id).subscribe((event: any) => {
      this.eventForm = this.formBuilder.group(event);

      if (this.subscription) this.subscription.unsubscribe();

      this.subscription = this.service.getOrganiser(event).subscribe((organiser: any) => {
        this.organiser = organiser;
      });

      this.eventForm.valueChanges.pipe(debounceTime(500)).subscribe(() => {
        this.service.updateEvent(id, this.eventForm.value)
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }
}
