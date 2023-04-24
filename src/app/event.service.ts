import { Injectable } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  observable: Observable<any[]>;
  subscriber!: Subscriber<any>;
  
  constructor() {
    this.observable = new Observable((subscriber: Subscriber<any[]>) => {

      this.subscriber = subscriber;

      subscriber.next(JSON.parse(localStorage.getItem('events') ?? '[]'));
    });
   }

   getEvents(): Observable<any[]> {
    return this.observable;
   }

   addEvent(event: any) {
    let events: any[] = JSON.parse(localStorage.getItem('events') ?? '[]');
    events.push(event);
    localStorage.setItem('events', JSON.stringify(events));

    this.subscriber.next(events);
   }

   clrEvents() {
    let events: any[] = [];
    localStorage.setItem('events', JSON.stringify(events));

    this.subscriber.next(events);
   }
}
