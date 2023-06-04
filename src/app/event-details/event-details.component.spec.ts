import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventDetailsComponent } from './event-details.component';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormBuilder } from '@angular/forms';

describe('EventDetailsComponent', () => {
  let component: EventDetailsComponent;
  let fixture: ComponentFixture<EventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventDetailsComponent ],
      providers: [ 
        { provide: ActivatedRoute, useValue: { snapshot: { paramMap: { get: () => 1 } } } },
        { provide: UntypedFormBuilder, useValue: {} }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
