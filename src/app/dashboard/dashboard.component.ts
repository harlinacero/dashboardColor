import { Component, AfterViewInit, ElementRef, OnDestroy, Inject, OnInit } from '@angular/core';
import "devextreme/localization/globalize/message";
import "devextreme/localization/globalize/number";
import "devextreme/localization/globalize/currency";
import "devextreme/localization/globalize/date";
import * as Globalize from 'globalize';
import { DashboardControl, ResourceManager, DashboardPanelExtension } from 'devexpress-dashboard';
import { TextBoxItemEditorExtension } from 'devexpress-dashboard/designer/text-box-item-editor-extension';
import { DOCUMENT } from "@angular/platform-browser";
import themes from "devextreme/ui/themes";
import { SimpleCardItemExtension } from '../extensions/customCard';
import { GantChartItemExtension } from '../extensions/gantt-chart-item/gantt-extension';
import { ChartAnnotationsExtension } from '../extensions/custom-annotations.extension';
// import { ChartCustomLabelExtension } from '../extensions/ChartCustomLabelExtension';
import { Router } from '@angular/router';
import devices from 'devextreme/core/devices';
declare var require: any;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  private dashboardControl: DashboardControl;

  constructor(private element: ElementRef,
    private router: Router,
    @Inject(DOCUMENT) private document) {
    this.initGlobalize();
    ResourceManager.embedBundledResources();
  }

  initGlobalize() {
    Globalize.load([
      require('devextreme-cldr-data/en.json'),
      require('devextreme-cldr-data/es-co.json'),
      require('devextreme-cldr-data/supplemental.json')
    ]);
    Globalize.locale('es-co');
  }

  ngOnInit(): void {

    const colorSchemaList = {
      'light': 'Light',
      'dark': 'Dark',
      'light.compact': 'Light Compact',
      'dark.compact': 'Dark Compact'
    };

    this.dashboardControl = new DashboardControl(this.element.nativeElement.querySelector('.dashboard-container'), {
      endpoint: "https://demos.devexpress.com/services/dashboard/api",
      // endpoint: "https://localhost:44381/api/dashboard",
      workingMode: 'Designer',
      useCardLegacyLayout: true,
      extensions: {
        'data-source-wizard': {
          enableCustomSql: true,
          canCreateNewJsonDataSource: true,
          allowCreateNewJsonConnection: true,
          wizardSettings: {
            enableJsonDataSource: true,
            enableOlapDataSource: true,
            enableSqlDataSource: true,
          }
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
              },
              // {
              //   type: 'button',
              //   icon: 'icon_phone',
              //   hint: 'VersionMonile',
              //   click: () => {
              //     this.toggleEmulator();
              //   }
              // }
            )
          }
        },
        'dashboard-export': {
          allowExportDashboard: true,
          allowExportDashboardItems: true
        },
        'mobile-layout': {
          mobileLayoutEnabled: 'auto',
        }
      },
      useNeutralFilterMode: true,
      showConfirmationOnBrowserClosing: true,

    });
    let db = this.dashboardControl;
    themes.ready(function () {
      db.render();
    });
    this.dashboardControl.registerExtension(new DashboardPanelExtension(this.dashboardControl));
    this.dashboardControl.registerExtension(new SimpleCardItemExtension(this.dashboardControl));
    this.dashboardControl.registerExtension(new GantChartItemExtension(this.dashboardControl));
    this.dashboardControl.registerExtension(new TextBoxItemEditorExtension(this.dashboardControl));
    this.dashboardControl.registerExtension(new ChartAnnotationsExtension(this.dashboardControl));
    // this.dashboardControl.registerExtension(new ChartCustomLabelExtension(this.dashboardControl));
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

  /**
 * Update view to emulator
 * @param e
 */
  toggleEmulator() {
    this.router.navigate(['emulator']);
    // this.router.navigateByUrl('emulator');
  }
}