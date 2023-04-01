import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {
  isCollapsed: boolean = false;

  collapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
