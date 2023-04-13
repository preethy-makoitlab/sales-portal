import { Component, OnInit } from '@angular/core';
import { UserStateService } from 'src/app/State/User/userstate.service';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
user:any;
  constructor(private userState:UserStateService){}
  async ngOnInit(): Promise<void> {
    this.user = await this.userState.getUser();
  }
  
}
