import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { DashboardMobileComponent } from './dashboard-mobile/dashboard-mobile.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { EmulatorComponent } from './emulator/emulator.component';

const routes: Routes = [
  // { path: 'dashboard', component: DashboardComponent },
  // { path: 'emulator', component: EmulatorComponent },
  // { path: 'mobileDashboard', component: DashboardMobileComponent },
  // { path: '', redirectTo: 'emulator', pathMatch: 'full' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }

export function HttpLoaderFactory(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

