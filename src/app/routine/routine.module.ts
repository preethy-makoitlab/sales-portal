import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RoutineRoutingModule } from './routine-routing.module';
import { ManageComponent } from './manage/manage.component';
import { AddComponent } from './add/add.component';
import { SharedModule } from '../common/shared.module';
import { FormsModule } from '@angular/forms';
import { Select2Module } from 'ng-select2-component';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';


@NgModule({
  declarations: [
    ManageComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    RoutineRoutingModule,
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
export class RoutineModule { }
