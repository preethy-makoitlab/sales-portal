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
    MatFormFieldModule
    
  ]
})
export class TherapistModule { }
