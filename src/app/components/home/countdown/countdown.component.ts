import { Component } from '@angular/core';
import { CounterComponent } from "../../shared/counter/counter.component";

@Component({
    selector: 'app-countdown',
    imports: [CounterComponent],
    templateUrl: './countdown.component.html',
    styleUrl: './countdown.component.css'
})
export class CountdownComponent {

  count: number = 0;
  finalCount: number = 44; // The final number you want to count up to
  interval: any;

  constructor() { }

  ngOnInit(): void {
    this.startCountUp();
  }

  startCountUp() {
    const duration = 2000; // Duration of the count-up in milliseconds
    const stepTime = Math.abs(Math.floor(duration / this.finalCount)); // Time per increment

    this.interval = setInterval(() => {
      if (this.count < this.finalCount) {
        this.count++;
      } else {
        clearInterval(this.interval);
      }
    }, stepTime);
  }

}
