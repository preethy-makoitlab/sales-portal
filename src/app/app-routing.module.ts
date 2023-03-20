import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-portal/admin-home/admin-home.component';
import { AdminPortalRoutingModule } from './components/admin-portal/admin-portal-routing.module';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { VideostreamComponent } from './components/videostream/videostream.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: 'admin',
        loadChildren: () => AdminPortalRoutingModule
      },
    ]
  },
  { path: 'video', component: VideostreamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
