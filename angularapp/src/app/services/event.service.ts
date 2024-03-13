import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Event } from '../model/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private backendUrl = 'https://ide-beeafcabeefc310549707bbefcdcfdftwo.premiumproject.examly.io/proxy/3001/events'; 

  constructor(private http: HttpClient) { }

  getEvents(): Observable<Event[]> {
    return this.http.get<any[]>(this.backendUrl);
  }

  addEvent(obj: any): Observable<any> {
    return this.http.post<any>(this.backendUrl, obj);
  }

  deleteEvent(id: number): Observable<void> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.delete<void>(url);
  }
  
  editEvent(obj: any,id: any): Observable<any> {
    const url = `${this.backendUrl}/${id}`;
    return this.http.put<any>(url, obj);
  }

}
