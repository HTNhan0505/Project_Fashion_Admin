import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventEmitterService {
  private subject = new Subject<any>();

  sendClickEvent() {
    this.subject.next(void 0);
  }

  getClickEvent(): Observable<any> {
    return this.subject.asObservable();
  }

  sendUpdateCategory() {
    this.subject.next(void 0);
  }
}
