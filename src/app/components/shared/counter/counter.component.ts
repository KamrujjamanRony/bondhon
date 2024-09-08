import { Component, ElementRef, inject, Input } from '@angular/core';

@Component({
  selector: 'app-counter',
  standalone: true,
  imports: [],
  templateUrl: './counter.component.html',
  styleUrl: './counter.component.css'
})
export class CounterComponent {
  private el = inject(ElementRef);

  @Input() finalCount: number = 0;  // Final count to be displayed
  count: number = 0;  // Start count
  interval: any;
  
  @Input() duration: number = 2000; // Optional: Duration for count-up
  private observer: IntersectionObserver | undefined;

  constructor() { }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    // Set up Intersection Observer
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          this.startCountUp();
          if (this.observer) {
            this.observer.disconnect(); // Stop observing once the animation starts
          }
        }
      });
    });

    // Start observing the component element
    if (this.observer) {
      this.observer.observe(this.el.nativeElement);
    }
  }

  startCountUp() {
    const stepTime = Math.abs(Math.floor(this.duration / this.finalCount)); // Time per increment

    this.interval = setInterval(() => {
      if (this.count < this.finalCount) {
        this.count++;
      } else {
        clearInterval(this.interval);
      }
    }, stepTime);
  }

}
