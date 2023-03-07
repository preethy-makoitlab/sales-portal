import { Component } from '@angular/core';
import { LANGUAGES } from 'src/app/models/constants';
import { AnyoTranslateService } from './../../services/anyo-translate.service';
import { Language } from 'src/app/models/common-models';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{

  constructor(private translate: AnyoTranslateService) {}

  languages: Language[] = LANGUAGES;
  defaultLanguage: string = AnyoTranslateService.default;

  ngOnInit(): void {
    this.translate.current = this.defaultLanguage;
  }

}
