import Globalize from 'globalize'
declare var require: (e) => any;

import { Component, AfterViewInit, ElementRef, OnDestroy } from '@angular/core';
import { DashboardControl, ResourceManager, DashboardPanelExtension } from 'devexpress-dashboard';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements AfterViewInit, OnDestroy {
  private dashboardControl: DashboardControl;
  constructor(private element: ElementRef) {
    this.initGlobalize();
    ResourceManager.embedBundledResources();
  }
  initGlobalize() {
    Globalize.load(
      require('devextreme-cldr-data/en.json'),
      //require('devextreme-cldr-data/de.json'),
      require('devextreme-cldr-data/supplemental.json')
    );
    Globalize.locale('en');
  }
  ngAfterViewInit(): void {
    this.dashboardControl = new DashboardControl(this.element.nativeElement.querySelector('.dashboard-container'), {
      // Specifies a URL of the Web Dashboard's server.
      endpoint: 'https://demos.devexpress.com/services/dashboard/api',
      workingMode: 'Designer',
    });

    this.dashboardControl.render();
  }

  ngOnDestroy(): void {
    this.dashboardControl && this.dashboardControl.dispose();
  }
}