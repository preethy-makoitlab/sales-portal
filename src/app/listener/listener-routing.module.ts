import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './add/add.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [
  {
  path: '',
  component: ManageComponent
  },
  {
    path: 'add',
    component: AddComponent
  },
  {
    path: 'add/:id',
    component: AddComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListenerRoutingModule { }
