import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TherapistRoutingModule } from './therapist-routing.module';
import { ManageComponent } from './manage/manage.component';
import { SharedModule } from '../common/shared.module';
import { AddComponent } from './add/add.component';
import { MatChipsModule, MatChipTrailingIcon } from '@angular/material/chips';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { HttpLoaderFactory } from '../app.module';
import { HttpClient } from '@angular/common/http';
import { Select2Module } from 'ng-select2-component';
// import { TagInputModule } from 'ngx-chips';
@NgModule({
  declarations: [
    ManageComponent,
    AddComponent
  ],
  imports: [
    CommonModule,
    TherapistRoutingModule,
    SharedModule,
    FormsModule,
    MatChipsModule,
    MatIconModule,
    MatAutocompleteModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    Select2Module,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class TherapistModule { }
