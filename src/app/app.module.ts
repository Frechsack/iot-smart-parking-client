import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { LogInComponent } from './component/log-in/log-in.component';
import { MatIconModule } from '@angular/material/icon'
import { MatCardModule } from '@angular/material/card';
import { PageRegisterComponent } from './page/page-register/page-register.component';
import { RegisterComponent } from './component/register/register.component';
import { MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { HomeComponent } from './page/home/home.component';
import { DeviceOverviewComponent } from './component/device-overview/device-overview.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { ParkingLotOverviewComponent } from './component/parking-lot-overview/parking-lot-overview.component';
import { MatChipsModule } from '@angular/material/chips';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthenticationInterceptor } from './interceptor/authentication-interceptor';
import { PageLogInComponent } from './page/page-log-in/page-log-in.component';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DeviceInstructionOverviewComponent } from './component/device-instruction-overview/device-instruction-overview.component';
import { MatTableModule } from '@angular/material/table';
import { DeviceStatusOverviewComponent } from './component/device-status-overview/device-status-overview.component';
import { PageDeviceComponent } from './page/page-device/page-device.component';



@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    LogInComponent,
    PageRegisterComponent,
    HomeComponent,
    DeviceOverviewComponent,
    ParkingLotOverviewComponent,
    PageLogInComponent,
    DeviceInstructionOverviewComponent,
    DeviceStatusOverviewComponent,
    PageDeviceComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    ReactiveFormsModule,
    MatCardModule,
    MatButtonModule,
    MatSnackBarModule,
    MatToolbarModule,
    MatChipsModule,
    MatExpansionModule,
    MatPaginatorModule,
    MatTableModule
  ],
  providers: [
    LogInComponent,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthenticationInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
