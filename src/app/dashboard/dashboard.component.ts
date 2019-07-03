import Globalize from 'globalize'
declare var require: (e) => any;

import { Component, AfterViewInit, ElementRef, OnDestroy, Inject } from '@angular/core';
import { DashboardControl, ResourceManager, DashboardPanelExtension } from 'devexpress-dashboard';
import { DOCUMENT } from "@angular/platform-browser";
import themes from "devextreme/ui/themes";
import { SimpleCardItemExtension } from '../extensions/customCard';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements AfterViewInit, OnDestroy {
  private dashboardControl: DashboardControl;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document) {
    this.initGlobalize();
    ResourceManager.embedBundledResources();
  }

  initGlobalize() {
    Globalize.load(
      require('devextreme-cldr-data/en.json'),
      require('devextreme-cldr-data/supplemental.json')
    );
    Globalize.locale('en');
  }
  ngAfterViewInit(): void {
    this.dashboardControl = new DashboardControl(this.element.nativeElement.querySelector(".dashboard-container"), {
      // Specifies a URL of the Web Dashboard's server.
      endpoint: "https://demos.devexpress.com/services/dashboard/api",
      workingMode: "Designer",
      extensions: {
        'data-source-wizard': {
          enableCustomSql: true
        },
      }
    });
    this.switchThemes();
    let db = this.dashboardControl;
    themes.ready(function () {
      db.render();
    });

    this.dashboardControl.registerExtension(new SimpleCardItemExtension(this.dashboardControl));
  }

  switchThemes(): void {
    let theme = window.localStorage.getItem("dx-theme") || "light";
    if (theme === "light")
      return;
    this.document.getElementById('themeAnalytics').setAttribute('href', 'assets/css/analytics/dx-analytics.' + theme + '.css');
    this.document.getElementById('themeDashboard').setAttribute('href', 'assets/css/dashboard/dx-dashboard.' + theme + '.css');
    themes.current("generic." + theme);
  }

  ngOnDestroy(): void {
    this.dashboardControl && this.dashboardControl.dispose();
  }

}