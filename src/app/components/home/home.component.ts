import { Component } from '@angular/core';
import { LANGUAGES } from 'src/app/models/constants';
import { AnyoTranslateService } from './../../services/anyo-translate.service';
import { Language } from 'src/app/models/common-models';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent{
 users:[] = [];


  constructor(private translate: AnyoTranslateService,private userService:UserService) {}

  languages: Language[] = LANGUAGES;
  defaultLanguage: string = AnyoTranslateService.default;

  ngOnInit(): void {
    this.translate.current = this.defaultLanguage;
    let request = {
      page: 0,
    numberOfRecords: 1000,

    }
    this.userService.listUsers(request).subscribe( {
      next:(data) =>{
       this.users = data.data;
      },
      error:(err) =>{
        console.log(err);
      }
    })
    
  }

}
