import { Injectable } from '@angular/core';
import { of as observableOf, Observable } from 'rxjs';
import { PeriodsService } from './periods.service';

export class UserActive {
  date: string;
  pagesVisitCount: Date | number;
  estimated?: Date;
  project_name?: string;
  deltaUp: boolean;
  newVisits: number;
}

@Injectable()
export class UserActivityService {
  private getRandom = (roundTo: number) => Math.round(Math.random() * roundTo);

  data = {};

  constructor(private periods: PeriodsService) {
    this.data = {
      week: this.getDataWeek(),
      month: this.getDataMonth(),
      year: this.getDataYear(),
    };
  }

  private getDataWeek(): UserActive[] {
    return this.periods.getWeeks().map(week => {
      return {
        date: week,
        pagesVisitCount: this.getRandom(1000),
        deltaUp: this.getRandom(1) % 2 === 0,
        newVisits: this.getRandom(100),
      };
    });
  }

  private getDataMonth(): UserActive[] {
    const date = new Date();
    const days = date.getDate();
    // const month = this.periods.getMonths()[date.getMonth()];

    return Array.from(Array(days)).map((_, index) => {
      return {
        date: `Actividad ${index + 1}`,
        pagesVisitCount: new Date(2018, this.getRandom(4)),
        estimated: new Date(2019, this.getRandom(5)),
        deltaUp: this.getRandom(1) % 2 === 0,
        newVisits: this.getRandom(100),
        project_name: `Proyecto ${this.getRandom(index + 3)}`,
      };
    });
  }

  private getDataYear(): UserActive[] {
    return this.periods.getYears().map(year => {
      return {
        date: year,
        pagesVisitCount: this.getRandom(1000),
        deltaUp: this.getRandom(1) % 2 === 0,
        newVisits: this.getRandom(100),
      };
    });
  }

  getUserActivityData(period: string): Observable<UserActive[]> {
    return observableOf(this.data[period]);
  }
}
