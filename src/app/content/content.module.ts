import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContentRoutingModule } from './content-routing.module';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule } from '@angular/forms';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { ManageComponent } from './manage/manage.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SecurePipe } from '../common/pipes/secure.pipe';
import { Select2Module } from 'ng-select2-component';


@NgModule({
  declarations: [
    AddComponent,
    ManageComponent
  ],
  imports: [
    CommonModule,
    ContentRoutingModule,
    SharedModule,
    FormsModule, 
    Select2Module,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    }),
    InfiniteScrollModule
  ]
})
export class ContentModule { }
