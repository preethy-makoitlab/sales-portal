import { Component } from '@angular/core';
import { AnyoTranslateService } from './services/anyo-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Anyo - Portal';

  constructor(private translate: AnyoTranslateService) {
  }
}
