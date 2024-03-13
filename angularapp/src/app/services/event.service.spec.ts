import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { EventService } from './event.service';
 
describe('EventService', () => {
  let service: EventService;
  let httpTestingController: HttpTestingController;
 
  const mockevents = [
    {
      id: 1,
      name: 'MusicEvent',
      date: '2023-12-20',
      location: 'Chennai',
      description: 'Event description',
    },
    {
      id: 2,
      name: 'Music',
      date: '2023-12-12',
      location: 'Chennai',
      description: 'Event description',
    },
  ];
 
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EventService],
    });
    service = TestBed.inject(EventService) as any;
    httpTestingController = TestBed.inject(HttpTestingController);
  });
 
  afterEach(() => {
    // Ensure that there are no outstanding requests after each test
    httpTestingController.verify();
  });
 
  fit('should_create_event_service', () => {
    expect(service as any).toBeTruthy();
  });
 
  fit('should_retrieve_events_from_the_API_via_GET', () => {
    // const mockevents = [...]; // Define your mock data
    (service as any).getEvents().subscribe((events) => {
      expect(events).toEqual(mockevents);
    });
    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('GET');
    req.flush(mockevents);
  });
 
  fit('should_add_a_event_via_POST', () => {
    const newevent = {
      name: 'Music Event',
      date: '2023-12-20',
      location: 'Chennai',
      description: 'Event description',
    };
    service['addEvent'](newevent).subscribe((event) => {
      expect(event).toEqual(newevent);
    });
    const req = httpTestingController.expectOne(`${service['backendUrl']}`);
    expect(req.request.method).toEqual('POST');
    req.flush(newevent);
  });

});