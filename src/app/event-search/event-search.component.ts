import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-event-search',
  templateUrl: './event-search.component.html',
  styleUrls: ['./event-search.component.css']
})
export class EventSearchComponent implements OnInit {

  query: Subject<string> = new Subject();

  @Output()
  search = new EventEmitter();

  constructor() {
    this.query.pipe(debounceTime(500)).subscribe((query) => {
      this.search.emit(query);
    })
   }

  ngOnInit(): void {
  }

  onChange(query: string) {
    this.query.next(query);
  }

}
