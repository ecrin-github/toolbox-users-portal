import {Observable, Subject} from 'rxjs';
import {Injectable} from '@angular/core';


@Injectable({providedIn: 'root'})
export class SubscriptionEvents {

  private clearEventSubject = new Subject<any>();
  private filterEventSubject = new Subject<any>();
  private clearFilterSubject = new Subject<any>();

  sendClearEvent(){
    this.clearEventSubject.next();
  }

  getClearEventSubject(): Observable<any>{
    return this.clearEventSubject.asObservable();
  }

  sendFilterEvent(){
    this.filterEventSubject.next();
  }

  getFilterEventSubject(): Observable<any> {
    return this.filterEventSubject.asObservable();
  }

  sendClearFilterEvent() {
    this.clearFilterSubject.next();
  }

  getClearFilterEvent(): Observable<any> {
    return this.clearFilterSubject.asObservable();
  }

}
