import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'Employee-Application';
  flagVal: boolean = false;
  @Input() close: boolean = false;
  closeSidebar(flag: any) {
    console.log('closed');
    if (flag) {
      this.flagVal = true;
    } else {
      this.flagVal = false;
    }
  }
}
