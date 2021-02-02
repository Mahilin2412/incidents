import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { IncidentFormComponent } from './components/incident-form/incident-form.component';
import { IncidentListComponent } from './components/incident-list/incident-list.component';

import { IncidentsService } from './services/incidents.service';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ProductService } from './services/product.service';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { EncrDecrService } from './services/encr-decr.service';
import { AuthService } from './services/auth.service';
import { InternoFormComponent } from './components/interno-form/interno-form.component';
import { InternoListComponent } from './components/interno-list/interno-list.component';
import { ReportaFormComponent } from './components/reporta-form/reporta-form.component';
import { ReportaListComponent } from './components/reporta-list/reporta-list.component';
import { RegistroFormComponent } from './components/registro-form/registro-form.component';
import { RegistroListComponent } from './components/registro-list/registro-list.component';
import { OperationFormComponent } from './components/operation-form/operation-form.component';
import { OperationListComponent } from './components/operation-list/operation-list.component';
import { ServiceFormComponent } from './components/service-form/service-form.component';
import { ServiceListComponent } from './components/service-list/service-list.component';
//import { ServicesService } from './services/services.service';
//import { OperationsService } from './services/operations.service';

@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    IncidentFormComponent,
    IncidentListComponent,
    ProductListComponent,
    ProductFormComponent,
    AuthLoginComponent,
    AuthFormComponent,
    InternoFormComponent,
    InternoListComponent,
    ReportaFormComponent,
    ReportaListComponent,
    RegistroFormComponent,
    RegistroListComponent,
    OperationFormComponent,
    OperationListComponent,
    ServiceFormComponent,
    ServiceListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    NgbModule
  ],
  providers: [
    IncidentsService,
    ProductService,
    EncrDecrService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
