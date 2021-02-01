import { Component, AfterViewInit, ElementRef, OnDestroy, Inject, OnInit } from '@angular/core';
import "devextreme/localization/globalize/message";
import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/date";
import { DOCUMENT } from "@angular/platform-browser";
import devices from 'devextreme/core/devices';
import { DashboardControl } from 'devexpress-dashboard';
import { Router } from '@angular/router';
declare var require: any;

// var mobileDashboardCallbacks = {
//   stateChanged: null,
//   dashboardChanged: null,
//   onDashboardChanged: function(e) {
//       // window.onDashboardChanged(e);
//       mobileDashboardCallbacks.dashboardChanged(e);
//   },
//   onStateChanged: function(e) {
//       mobileDashboardCallbacks.stateChanged(e);
//   }
// }

// function getDashboardControl() {
//   return DashboardControl;
// }
// window.onload = function() {
//   if (window.parent !== window && !devices.current().phone) {
//       devices.current("genericPhone");
//   }
// }

// window["mobileDashboardCallbacks"] = mobileDashboardCallbacks;

@Component({
  selector: 'app-dashboard-mobile',
  templateUrl: './dashboard-mobile.component.html',
  styleUrls: ['./dashboard-mobile.component.scss']
})
export class DashboardMobileComponent implements OnInit {


  constructor(private element: ElementRef, private router: Router, @Inject(DOCUMENT) private document) {

  }

  ngOnInit(): void {

  }

}

