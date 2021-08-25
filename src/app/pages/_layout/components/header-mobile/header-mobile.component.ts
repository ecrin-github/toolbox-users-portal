import { Component, OnInit, AfterViewInit } from '@angular/core';
import { LayoutService } from '../../../../_mdr/core';
import { environment } from 'src/environments/environment.prod';


@Component({
  selector: 'app-header-mobile',
  templateUrl: './header-mobile.component.html',
  styleUrls: ['./header-mobile.component.scss'],
})
export class HeaderMobileComponent implements OnInit, AfterViewInit {
  headerLogo = '';
  asideSelfDisplay = true;
  headerMenuSelfDisplay = true;
  headerMobileClasses = '';
  headerMobileAttributes = {};
  version: string;
  status: string;

  constructor(private layout: LayoutService) {
    this.version = environment.appVersion;
    this.status = `Beta version (${this.version})`;
  }

  ngOnInit(): void {
    // build view by layout config settings
    this.headerMobileClasses = this.layout.getStringCSSClasses('header_mobile');
    this.headerMobileAttributes = this.layout.getHTMLAttributes(
      'header_mobile'
    );

    this.headerLogo = this.getLogoUrl();
    this.asideSelfDisplay = this.layout.getProp('aside.self.display');
    this.headerMenuSelfDisplay = this.layout.getProp(
      'header.menu.self.display'
    );
  }

  ngAfterViewInit() {
    // Init Header Topbar For Mobile Mode
    // KTLayoutHeaderTopbar.init('kt_header_mobile_topbar_toggle');
  }

  private getLogoUrl() {
    const headerSelfTheme = this.layout.getProp('header.self.theme') || '';
    const brandSelfTheme = this.layout.getProp('brand.self.theme') || '';
    let result = 'ecrin-logo.jpg';
    if (!this.asideSelfDisplay) {
      if (headerSelfTheme === 'light') {
        result = 'ecrin-logo.jpg';
      }
    } else {
      if (brandSelfTheme === 'light') {
        result = 'ecrin-logo.jpg';
      }
    }
    return `./assets/media/logos/${result}`;
  }
}
