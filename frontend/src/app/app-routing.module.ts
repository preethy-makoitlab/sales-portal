import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { VideostreamComponent } from './components/videostream/videostream.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      // {
      //   path: 'dashboard',
      //   component: DashboardComponent,
      // }
    ]
  },
  {path: 'video', component: VideostreamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
