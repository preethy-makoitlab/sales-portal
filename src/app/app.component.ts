import { Component, OnInit } from '@angular/core';
import { AnyoTranslateService } from './services/anyo-translate.service';
import { UserStateService } from './State/User/userstate.service';
import { AuthenticationService } from './services/authentication.service';
import { CookieService } from 'ngx-cookie-service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Anyo - Portal';

  constructor(private translate: AnyoTranslateService, private userState: UserStateService, private auth: AuthenticationService, private cookieService: CookieService) {
  }
  async ngOnInit() {
    if (true) {
      if(false){
      this.cookieService.set("accessToken","6434ec72c6d448af54bed8a1");
      this.cookieService.set("refreshToken","6434ec72c6d448af54bed8a1");
      }
      let token = this.cookieService.get("accessToken");
      if(!token){
        this.auth.clearUserData();
       window.location.href = environment.authPageUrl;

      }
      token = token.replace(/['"]+/g, '');
            let user = null;

      if (!this.auth.getUserId()) {
        if (!token) {
          // window.location.href = environment.authPageUrl;
          console.log(token);

          //+"/login/"+environment.app;

        }
        user = await this.userState.fetchUser(token);
        console.log(user);

        this.auth.setUserId(user.id);
        console.log(this.auth.getUserId());

        this.userState.addUser(user);
        console.log("USER", user);

      } else {
        user = await this.userState.getUser();
        console.log("USER", user);


      }
    }

  }

}
