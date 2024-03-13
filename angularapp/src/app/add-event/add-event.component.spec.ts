import {
  ComponentFixture,
  TestBed,
  async,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  FormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { AddEventComponent } from './add-event.component';
import { EventService } from '../services/event.service';
import { of, throwError } from 'rxjs';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { DebugElement } from '@angular/core';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';

describe('AddeventComponent', () => {
  let component: AddEventComponent;
  let fixture: ComponentFixture<AddEventComponent>;
  let service: EventService;
  let debugElement: DebugElement;
  let formBuilder: FormBuilder;
  class RouterStub {
    navigate(commands: any[]): Promise<boolean> {
      return Promise.resolve(true);
    }
  }
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddEventComponent],
      imports: [ReactiveFormsModule, HttpClientTestingModule],
      providers: [EventService, { provide: Router, useClass: RouterStub }],
    });
    formBuilder = TestBed.inject(FormBuilder) as any;
    fixture = TestBed.createComponent(AddEventComponent) as any;
    component = fixture.componentInstance as any;
    service = TestBed.inject(EventService) as any;
    fixture.detectChanges();
  });

  fit('should_create_AddEvent_Component', () => {
    expect(component as any).toBeTruthy();
  });


  fit('should_add_a_new_event_when_form_is_valid', () => {
    const mockevent = {
      name: 'MusicEvent',
      date: '2023-10-23',
      location: 'Chennai',
      description: 'Event description',
    };
    spyOn((service as any), 'addEvent').and.returnValue(of(mockevent)); // Mock the addevent method
    (component as any).eventForm.setValue(mockevent); // Set form values
    (component as any).addNewEvent(); // Trigger the addNewevent method
    expect((component as any).eventForm.valid).toBeTruthy();
    expect(service['addEvent']).toHaveBeenCalledWith(mockevent);
  });


  fit('should_add_all_the_required_fields', () => {
    const form = (component as any).eventForm;
    form.setValue({
      name: '',
      date: '',
      location: '',
      description: '',
    });

    expect(form.valid).toBeFalsy();
    expect(form.get('name')?.hasError('required')).toBeTruthy();
    expect(form.get('date')?.hasError('required')).toBeTruthy();
    expect(form.get('location')?.hasError('required')).toBeTruthy();
    expect(form.get('description')?.hasError('required')).toBeTruthy();
  });

});
