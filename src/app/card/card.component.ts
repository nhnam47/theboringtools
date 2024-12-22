import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatIconModule, CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss',
})
export class CardComponent {
  @Input() title: string = '';
  @Input() description: string = '';
  @Input() startDay?: Timestamp;
  @Input() location: string = '';
  @Input() createdDate?: Timestamp;
  @Input() imageUrl?: string;

  @Output() edit = new EventEmitter<void>();
  @Output() delete = new EventEmitter<void>();

  currentDay: number = 0;
  formattedStartDay: string = '';
  timeDifference: string = '';
  timeDifferenceInDays: number = 0;
  intervalId: any;

  ngOnInit() {
    this.currentDay = this.calculateCurrentDay();
    this.formatStartDay();
    this.calculateTimeDifference();
    this.calculateTimeDifferenceInDays();
    this.intervalId = setInterval(() => this.calculateTimeDifference(), 1000);
  }
  calculateCurrentDay(): number {
    console.log('Calculating current day');
    return 0;
  }

  private calculateTimeDifference(): void {
    if (this.startDay) {
      const startDate = this.startDay.toDate();
      const now = moment();
      const duration = moment.duration(now.diff(startDate));

      const years = duration.years();
      const months = duration.months();
      const weeks = Math.floor(duration.asWeeks()) % 4;
      const days = duration.days();
      const hours = duration.hours();
      const minutes = duration.minutes();
      const seconds = duration.seconds();
      // this.timeDifference = `${years} years, ${months} months, ${weeks} weeks, ${days} days`;
      const parts = [];
      if (years > 0) parts.push(`${years} years`);
      if (months > 0) parts.push(`${months} months`);
      if (weeks > 0) parts.push(`${weeks} weeks`);
      if (days > 0) parts.push(`${days} days`);
      if (hours > 0) parts.push(`${hours} hours`);
      if (minutes > 0) parts.push(`${minutes} minutes`);
      parts.push(`${seconds} seconds`);

      this.timeDifference = parts.join(', ');
    }
  }
  private calculateTimeDifferenceInDays(): void {
    if (this.startDay) {
      const startDate = this.startDay.toDate();
      const now = moment();
      this.timeDifferenceInDays = now.diff(startDate, 'days');
    }
  }

  onEdit() {
    this.edit.emit();
  }

  onDelete() {
    this.delete.emit();
  }

  private formatStartDay(): void {
    if (this.startDay) {
      const date = this.startDay.toDate();
      this.formattedStartDay = moment(date).format('DD/MM/YYYY');
    }
  }
}
