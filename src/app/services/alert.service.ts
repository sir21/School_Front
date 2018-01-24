import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable } from 'rxjs';
import { Subject } from 'rxjs/Subject';
import { element } from 'protractor';

@Injectable()
export class AlertService {

  private subject = new Subject<any>();
  private keppAfterNavigationChange = false;

  constructor(private router: Router) { 
    router.events.subscribe(event =>
    {
      if(event instanceof NavigationStart)
      {
        if(this.keppAfterNavigationChange){
          this.keppAfterNavigationChange = false;
        } else{
          this.subject.next();
        }
      }
    });
  }

  success(message: string, keppAfterNavigationChange = false){
    this.keppAfterNavigationChange = keppAfterNavigationChange;
    this.subject.next({type: 'success', text: message});
  }

  error(message: string, keppAfterNavigationChange = false){
    this.keppAfterNavigationChange = keppAfterNavigationChange;
    this.subject.next({type: 'error', text: message});
  }

  getMessage(): Observable<any>{
    return this.subject.asObservable();
  }
}
