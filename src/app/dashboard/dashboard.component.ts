import Globalize from 'globalize'
declare var require: (e) => any;

import { Component, AfterViewInit, ElementRef, OnDestroy, Inject, OnInit } from '@angular/core';
import { DashboardControl, ResourceManager, DashboardPanelExtension } from 'devexpress-dashboard';
import { DOCUMENT } from "@angular/platform-browser";
import themes from "devextreme/ui/themes";
import { SimpleCardItemExtension } from '../extensions/customCard';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})

export class DashboardComponent implements OnInit {
  private dashboardControl: DashboardControl;

  constructor(private element: ElementRef, @Inject(DOCUMENT) private document) {
    // this.initGlobalize();
    ResourceManager.embedBundledResources();
  }

  initGlobalize() {
    // Globalize.load(
    //   require('devextreme-cldr-data/en.json'),
    //   require('devextreme-cldr-data/supplemental.json')
    // );
    // Globalize.locale('en');

    var json = { main: {} };
    json["main"]["es"] = { 'numbers': { 'currencyFormats-numberSystem-latn': { 'standard': '¤#,##0.00' } } };
    Globalize.load(json);
    Globalize.locale('es');
  }


  ngOnInit(): void {

    const colorSchemaList = {
      'light': 'Light',
      'dark': 'Dark',
      'light.compact': 'Light Compact',
      'dark.compact': 'Dark Compact'
    };

    this.dashboardControl = new DashboardControl(this.element.nativeElement.querySelector(".dashboard-container"), {
      // Specifies a URL of the Web Dashboard's server.
      endpoint: "https://demos.devexpress.com/services/dashboard/api",
      // endpoint: "https://localhost:44381/api/dashboard",
      workingMode: "Designer",
      extensions: {
        'data-source-wizard': {
          enableCustomSql: true
        },
        'viewer-api': {
          onDashboardTitleToolbarUpdated: (e) => {
            e.options.actionItems.push(
              {
                type: 'menu',
                icon: 'colorSchemeIcon',
                hint: 'Color Schema',
                menu: {
                  items: Object.keys(colorSchemaList).map(function (key) { return colorSchemaList[key]; }),
                  type: 'list',
                  selectionMode: 'single',
                  selectedItems: this.getColorSchema(),
                  itemClick: (data, element, index) => {
                    const newTheme = Object.keys(colorSchemaList)[index];
                    this.switchThemes(newTheme);
                  }
                }
              })
          },
        }
      }
    });
    let db = this.dashboardControl;
    themes.ready(function () {
      db.render();
    });
    this.dashboardControl.registerExtension(new DashboardPanelExtension(this.dashboardControl));
    this.dashboardControl.registerExtension(new SimpleCardItemExtension(this.dashboardControl));
  }

  switchThemes(newTheme): void {
    // this.document.getElementById('themeFonts').setAttribute('href', 'assets/css/dxt/dx.' + newTheme + '.css');
    this.document.getElementById('themeAnalytics').setAttribute('href', 'assets/css/analytics/dx-analytics.' + newTheme + '.css');
    this.document.getElementById('themeDashboard').setAttribute('href', 'assets/css/dashboard/dx-dashboard.' + newTheme + '.css');
    themes.current("generic." + newTheme);
  }

  /**
 *  Get Color scheme from localstorage
 */
  getColorSchema() {
    const query = window.location.search.substring(1);
    const vars = query.split('&');
    for (let i = 0; i < vars.length; i++) {
      const pair = vars[i].split('=');
      if (pair[0] === 'colorSchema') { return pair[1]; }
    }
    return 'light.compact';
  }


  ngOnDestroy(): void {
    this.dashboardControl && this.dashboardControl.dispose();
  }

}