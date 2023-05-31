import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventCreateComponent } from './event-create.component';
import { EventService } from '../event.service';

describe('EventCreateComponent', () => {
  let component: EventCreateComponent;
  let fixture: ComponentFixture<EventCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventCreateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call addEvent', () => {
    let eventService = TestBed.inject(EventService);

    let addEventSpy = spyOn(eventService, 'addEvent');

    component.onSave();

    expect(addEventSpy).toHaveBeenCalled();
  });
});
