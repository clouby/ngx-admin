import { Component, Input, OnInit, OnDestroy } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { StaticUser } from '../../../@core/models/User.model';
import { interval, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import {
  UserActive,
  UserActivityService,
} from '../../../@core/data/user-activity.service';

@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() position: string = 'normal';

  user: StaticUser;

  today = new Date();

  userActivity: UserActive[] = [];
  type = 'month';
  types = ['week', 'month', 'year'];
  currentTheme: string;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  tokenExpTime: number;
  tokenStatus: Observable<string>;

  constructor(
    private sidebarService: NbSidebarService,
    private menuService: NbMenuService,
    private authService: NbAuthService,
    private analyticsService: AnalyticsService,
    private layoutService: LayoutService,
    private userActivityService: UserActivityService,
  ) {}

  ngOnInit() {
    this.getUserActivity(this.type);

    this.authService.onTokenChange().subscribe((token: NbAuthJWTToken) => {
      if (token.isValid()) {
        const { email, fullName, _id, role } = token.getPayload();

        this.user = <StaticUser>{ email, fullName, _id, role };

        this.tokenStatus = this.tokenStatusAsync(
          token.getTokenExpDate().getTime(),
        );

        this.tokenExpTime = token.getTokenExpDate().getTime();
      }
    });
  }

  private tokenStatusAsync(
    expiresInDate: number,
    mils: number = 1000,
  ): Observable<string> {
    return interval(mils).pipe(
      map(_ => new Date().getTime()),
      map(date_now => (expiresInDate > date_now ? 'success' : 'danger')),
    );
  }

  getUserActivity(period: string) {
    this.userActivityService
      .getUserActivityData(period)
      .subscribe(userActivityData => {
        this.userActivity = userActivityData;
      });
  }

  toggleSidebar(): boolean {
    this.sidebarService.toggle(true, 'menu-sidebar');
    this.layoutService.changeLayoutSize();

    return false;
  }

  toggleSettings(): boolean {
    this.sidebarService.toggle(false, 'settings-sidebar');

    return false;
  }

  goToHome() {
    this.menuService.navigateHome();
  }

  startSearch() {
    this.analyticsService.trackEvent('startSearch');
  }

  ngOnDestroy() {}
}
