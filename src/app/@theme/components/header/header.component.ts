import { Component, Input, OnInit } from '@angular/core';

import { NbMenuService, NbSidebarService } from '@nebular/theme';

import { AnalyticsService } from '../../../@core/utils/analytics.service';
import { LayoutService } from '../../../@core/data/layout.service';
import { NbAuthJWTToken, NbAuthService } from '@nebular/auth';
import { StaticUser } from './config.model';
import * as moment from "moment";
import { interval, Observable } from 'rxjs';
import { filter, map, tap } from 'rxjs/operators';


@Component({
  selector: 'ngx-header',
  styleUrls: ['./header.component.scss'],
  templateUrl: './header.component.html',
})
export class HeaderComponent implements OnInit {

  @Input() position = 'normal';

  user: StaticUser;

  userMenu = [{ title: 'Profile' }, { title: 'Log out' }];
  tokenExpTime:string;
  tokenStatus:Observable<string>;

  constructor(private sidebarService: NbSidebarService,
              private menuService: NbMenuService,
              private authService: NbAuthService,
              private analyticsService: AnalyticsService,
              private layoutService: LayoutService) {
  }

  ngOnInit() {
      this.authService.onTokenChange()
      .subscribe((token: NbAuthJWTToken) => {
        if ( token.isValid() ) {
          const { email, fullName, _id, role } = token.getPayload() as StaticUser;
          this.user = <StaticUser>{ email, fullName, _id, role };
          
          const expDate = moment( token.getTokenExpDate().getTime() )
          
          this.tokenStatus = this.tokenStatusAsync( token.getTokenExpDate().getTime() )
          
          this.tokenExpTime = expDate.format('lll');
        }
      });
  }

  private tokenStatusAsync( expiresInDate:number, time:number = 1000 ): Observable<string> {
    return interval(time)
           .pipe(
             map(n => (new Date()).getTime()),
             map(date_now => (expiresInDate > date_now) ? 'success' : 'danger' )
           );
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
}
