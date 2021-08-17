import { Component, OnDestroy, OnInit } from '@angular/core';
import { interval, Observable, Subscription } from 'rxjs';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  private firstObsSubscription: Subscription;
  constructor() { }

  ngOnInit() {
    // this.firstObsSubscription = interval(1000).subscribe(
    //   (count: number) => { console.log('console log' + count) }
    // );

    const customIntervalObservable = Observable.create(
      observer => {
        let count = 0;
        setInterval(() => {
          observer.next(count);
          if (count == 5) {
            observer.complete();
          }
          if (count > 3) {
            observer.error(new Error('count is greater 3!'));
          }
          count++;
        }, 1000)
      }
    );


    this.firstObsSubscription = customIntervalObservable.pipe(filter((data: number) => {
      return data > 0;
    }), map((data: number) => {
      return 'Round ' + (data + 1);
    })).subscribe(
      (data) => {
        console.log(data);
      }, error => {
        console.log(error);
      }, () => {
        // only in case of success, this gets executed
        console.log('Completed!');
      }
    );
  }

  ngOnDestroy() {
    this.firstObsSubscription.unsubscribe();
  }
}
