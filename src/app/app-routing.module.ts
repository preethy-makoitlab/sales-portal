import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { VideostreamComponent } from './components/videostream/videostream.component';
import { TherapistRoutingModule } from './therapist/therapist-routing.module';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,
    children: [
      {
        path: '',
        component: AdminHomeComponent
      },
      {
        path: 'therapist',
        loadChildren: () => TherapistRoutingModule
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
