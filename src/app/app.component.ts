import { Component, OnInit, OnDestroy } from '@angular/core';

import { Observable, Subscribable } from 'rxjs-compat/Observable';
import 'rxjs-compat/add/observable/interval';
import { Subscription } from 'rxjs-compat';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

  secondes: number = 0;
  counterSubscription: Subscription;

  constructor() {
  }

  ngOnInit() {
    const counter = Observable.interval(1000);
    this.counterSubscription = counter.subscribe(
      (value) => {
        this.secondes = value;
      },
      (error) => {
        console.log('Uh-oh, an error occurred ! : ' + error );
      },
      () => {
        console.log('Observable complete ! ');
      }
    )
  }

  ngOnDestroy() {
    this.counterSubscription.unsubscribe();
  }


}
