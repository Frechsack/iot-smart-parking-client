import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './page/home/home.component';
import { PageDeviceComponent } from './page/page-device/page-device.component';
import { PageLogInComponent } from './page/page-log-in/page-log-in.component';
import { PageRegisterComponent } from './page/page-register/page-register.component';

const routes: Routes = [
  { path: 'register', component: PageRegisterComponent },
  { path: 'login', component: PageLogInComponent },
  { path: 'devices' , component: PageDeviceComponent },
  { path: '', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
