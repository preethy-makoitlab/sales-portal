import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewComponent } from './view/view.component';
import { ManageComponent } from './manage/manage.component';

const routes: Routes = [{
  path:'',
  component: ManageComponent
}
  ,{
  path: 'view/:id',
  component: ViewComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CustomerRoutingModule { }
