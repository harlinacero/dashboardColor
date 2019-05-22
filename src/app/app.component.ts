import { Component } from '@angular/core';
import themes from "devextreme/ui/themes";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'dashboard-test';

  switchTheme() {
    let theme;
    switch (themes.current()) {
      case "generic.light":
        theme = "dark";
        break;
      case "generic.dark":
        theme = "light";
        break;
      default:
        theme = "light";
        break;
    }
    window.localStorage.setItem("dx-theme", theme);
    window.location.reload();
  }
}
