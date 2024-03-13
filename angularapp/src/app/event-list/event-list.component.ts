import { Component, OnInit } from '@angular/core';
import { Event } from '../model/event.model';
import { EventService } from '../services/event.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.component.html',
  styleUrls: ['./event-list.component.css']
})
export class EventListComponent implements OnInit {
  events: Event[] = [];

  constructor(private eventService: EventService, private router:Router) { }

  ngOnInit(): void {
    this.getEvents();
  }
  // navigateToEvents() {
  //   this.router.navigate(['/events']);
  // }
  // redirectToAddEvent() {
  //   // Assuming you have a button click or some other trigger
  //   this.router.navigate(['/add']);
  // }


  getEvents(): void {
    this.eventService.getEvents().subscribe(
      (res) => {
        console.log(res);
        this.events = res;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  // deleteEvent(id: any): void {
  //   this.eventService.deleteEvent(id).subscribe(() => {
  //     this.events = this.events.filter(event => event.id !== id);
  //   });
  // }

  // editEvent(event: Event): void {
  //   event.isEditing = true;
  // }

  // cancelEdit(event: Event): void {
  //   event.isEditing = false;
  // }

  // saveEvent(event: Event): void {
  //   this.eventService.editEvent(event, event.id).subscribe(() => {
  //     event.isEditing = false;
  //   });
  // }
}

