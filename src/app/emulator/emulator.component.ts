import { Component, OnInit, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import {
  DashboardControl, ResourceManager
} from 'devexpress-dashboard';
import { ActivatedRoute, Router } from '@angular/router';
import devices from "devextreme/core/devices";



@Component({
  selector: 'app-emulator',
  templateUrl: './emulator.component.html',
  styleUrls: ['./emulator.component.scss']
})
export class EmulatorComponent implements OnInit {
  dashboardId: string;
  dashboardControl: DashboardControl;
  srcDashboard: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    ResourceManager.embedBundledResources();
  }


  ngOnInit() {
    // this.activatedRoute.params.subscribe(p => {
    this.getDashdBoard();
    // });
  }


  getDashdBoard() {
    const srcDashboard = location.href.replace('emulator', 'mobileDashboard');
    document.getElementById('emulator').setAttribute('src', srcDashboard);
  }

  emulatorLoaded(emulator) {
    emulator.contentWindow.mobileDashboardCallbacks.dashboardChanged = function (e) {
      console.log(e)
        //  dxDemo.Navigation.saveToUrl("dashboardId", e.dashboardId)
    };
    emulator.contentWindow.mobileDashboardCallbacks.stateChanged = function (e) {
      console.log(e)
      // dxDemo.Navigation.saveToUrl("dashboardState", e.stateString)
    };
    // window.getDashboardControl = function () {
    //   return emulator.contentWindow.getDashboardControl();
    // };
  }

}

