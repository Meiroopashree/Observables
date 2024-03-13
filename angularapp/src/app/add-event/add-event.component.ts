import { Component, OnInit } from '@angular/core';
import { EventService } from '../services/event.service';
import { FormBuilder, FormControl, FormGroup, Validators,AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-event',
  templateUrl: './add-event.component.html',
  styleUrls: ['./add-event.component.css']
})
export class AddEventComponent implements OnInit {

  constructor(private eventService: EventService, private router:Router, private formBuilder: FormBuilder) {}
  // navigateToAddEvent() {
  //   this.router.navigate(['/add']);
  // }
  // redirectToEvents() {
  //   // Assuming you have a button click or some other trigger
  //   this.router.navigate(['/events']);
  // }
  
  eventForm!: FormGroup;
  ngOnInit(): void {
    this.eventForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(6)]],
      date: ['', [Validators.required, Validators.pattern(/^\d{4}-\d{2}-\d{2}$/), this.dateValidator]],
      location: ['', [Validators.required]],
      description: ['', [Validators.required]],
    });
  }

  dateValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(control.value)) {
      return { 'pattern': true };
    }

    const [year, month, day] = control.value.split('-').map(Number);

    if (month < 1 || month > 12) {
      return { 'monthOutOfRange': true };
    }

    if (day < 1 || day > 31) {
      return { 'dayOutOfRange': true };
    }

    return null;
  }
  
  addNewEvent() {
    if (this.eventForm.valid) {
      console.log(this.eventForm.value);
      try{
        this.eventService.addEvent(this.eventForm.value)
          .subscribe((res) => {
           console.log(res)
            // this.events = res
          },(err)=>{
            console.log(err)
          });
      }catch(err){
        console.log("Err",err)
      }
    }
    this.router.navigate(['/events']);
  }

}
