import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClient, HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { VideostreamComponent } from './components/videostream/videostream.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { TherapistModule } from './therapist/therapist.module';
import { SharedModule } from './common/shared.module';
import { MenuComponent } from './components/menu/menu.component';
import { PartnerModule } from './partner/partner.module';
import { ContentModule } from './content/content.module';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { ListenerModule } from './listener/listener.module';

@NgModule({
  declarations: [
    AppComponent,
    MainLayoutComponent,
    AdminHomeComponent,
    MenuComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SharedModule,
    TherapistModule,
    PartnerModule,
    ContentModule,
    ListenerModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ],
  providers: [    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true }
],
  bootstrap: [AppComponent]
})
export class AppModule { }

export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http);
}