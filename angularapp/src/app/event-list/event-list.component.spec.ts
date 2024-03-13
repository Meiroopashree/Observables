import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventListComponent } from './event-list.component';
import { EventService } from '../services/event.service';
import { of } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Event } from '../model/event.model';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';


describe('EventListComponent', () => {
  let component: EventListComponent;
  let fixture: ComponentFixture<EventListComponent>;
  let service: EventService;
  class RouterStub {
    navigate(commands: any[]): Promise<boolean> {
      return Promise.resolve(true);
    }
  }

  const mockevents = [
    {
      id: 1,
      name: 'MusicEvent',
      date: '2020-11-20',
      location: 'Chennai',
      description: 'Event description',
    },
    {
      id: 2,
      name: 'MusicEvent',
      date: '2020-11-20',
      location: 'Chennai',
      description: 'Event description',
    },
  ];
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EventListComponent],
      providers: [EventService,{ provide: Router, useClass: RouterStub }],
      imports: [HttpClientTestingModule],
 
    });
    fixture = TestBed.createComponent(EventListComponent);
    component = fixture.componentInstance;
    service = TestBed.inject(EventService);
  });
 
 
  fit('should_create_EventList_Component', () => {
    expect(component as any).toBeTruthy();
  });
 
  fit('should_call_getEvents', () => {
    spyOn((service as any), 'getEvents').and.returnValue(of([]));
    (component as any).getEvents();
    expect((component as any).getEvents).toBeDefined();
    expect((component as any).getEvents instanceof Function).toBeTruthy();
    expect((service as any).getEvents).toHaveBeenCalled();
  });

  fit('should_call_deleteEvent', () => {
    spyOn((service as any), 'deleteEvent').and.returnValue(of());
    (component as any).deleteEvent();
    expect((component as any).deleteEvent).toBeDefined();
    expect((component as any).deleteEvent instanceof Function).toBeTruthy();
    expect((service as any).deleteEvent).toHaveBeenCalled();
  });

  // fit('should set isEditing to true when calling editEvent', () => {
  //   const event = {
  //     id: 1,
  //     name: 'MusicEvent',
  //     date: '2020-11-20',
  //     location: 'Chennai',
  //     description: 'Event description',
  //     isEditing: false, 
  //   };
  //   (component as any).editEvent(event);
  //   expect(event.isEditing).toBe(true);
  // });

});