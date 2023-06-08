import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OrdersRoutingModule } from './components/orders/orders-routing.module';
import { LayoutComponent } from './components/layout/layout.component';
import { CustomerRoutingModule } from './components/customer/customer-routing.module';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [{
      path: 'orders',
      loadChildren: () => OrdersRoutingModule
    }, {
      path: 'customer',
      loadChildren: () => CustomerRoutingModule
    }]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
