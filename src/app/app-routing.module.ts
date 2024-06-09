import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { OrdersComponent } from './components/orders/orders.component';
import { SingleOrderComponent } from './components/single-order/single-order.component';
import { DeliveryComponent } from './components/delivery/delivery.component';
import { AmountComponent } from './components/amount/amount.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/login' },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  {
    path: 'single-order/:query',
    component: SingleOrderComponent,
  },
  {
    path: 'delivery/:query',
    component: DeliveryComponent,

  },
  { path: 'orders', component: OrdersComponent },
  { path: 'amount', component: AmountComponent },
  { path: 'users', component: UserComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
