import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { VideostreamComponent } from './components/videostream/videostream.component';

const routes: Routes = [
  {path: 'home', component: HomeComponent},
  {path: 'video', component: VideostreamComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
