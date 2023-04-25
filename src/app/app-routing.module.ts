import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './components/admin-home/admin-home.component';
import { MainLayoutComponent } from './components/main-layout/main-layout.component';
import { VideostreamComponent } from './components/videostream/videostream.component';
import { PartnerRoutingModule } from './partner/partner-routing.module';
import { TherapistRoutingModule } from './therapist/therapist-routing.module';
import { ContentRoutingModule } from './content/content-routing.module';
import { ListenerRoutingModule } from './listener/listener-routing.module';

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
      {
        path: 'partner',
        loadChildren: () => PartnerRoutingModule
      },
      {
        path: 'content',
        loadChildren: () => ContentRoutingModule
      },
      {
        path: 'listener',
        loadChildren: () => ListenerRoutingModule
      }
    ]
  },
  { path: 'video', component: VideostreamComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
