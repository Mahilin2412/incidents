import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { IncidentListComponent } from './components/incident-list/incident-list.component';
import { IncidentFormComponent } from './components/incident-form/incident-form.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { AuthLoginComponent } from './components/auth-login/auth-login.component';
import { AuthFormComponent } from './components/auth-form/auth-form.component';
import { AuthGuard } from '../app/shared/guards/auth.guard'

//Registro Diario
import { RegistroListComponent } from './components/registro-list/registro-list.component';
import { RegistroFormComponent } from './components/registro-form/registro-form.component';
import { InternoListComponent } from './components/interno-list/interno-list.component';
import { InternoFormComponent } from './components/interno-form/interno-form.component';
import { ReportaListComponent } from './components/reporta-list/reporta-list.component';
import { ReportaFormComponent } from './components/reporta-form/reporta-form.component';

// Caida de Servicios
//Services
import { ServiceListComponent} from './components/service-list/service-list.component';
import { ServiceFormComponent} from './components/service-form/service-form.component';

//Operations
import { OperationListComponent} from './components/operation-list/operation-list.component';
import { OperationFormComponent} from './components/operation-form/operation-form.component';


const routes: Routes = [
  {
    path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  {
    path: 'incidents',
    component: IncidentListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'incidents/add',
    component: IncidentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'incidents/edit/:id',
    component: IncidentFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products',
    component: ProductListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/add',
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'products/edit/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'login',
    component: AuthLoginComponent
  },
  {
    path: 'login/add',
    component: AuthFormComponent
  },
  //Registro Diario
  {
    path: 'registros',
    component: RegistroListComponent
  },
  {
    path: 'registros/add', 
    component: RegistroFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'registros/edit/:id',
    component: RegistroFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'internos',
    component: InternoListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'internos/add', 
    component: InternoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'internos/edit/:id',
    component: InternoFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporta',
    component: ReportaListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporta/add', 
    component: ReportaFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'reporta/edit/:idd',
    component: ReportaFormComponent,
    canActivate: [AuthGuard]
  },
  // Caida de servicios
  {
    path:'services',
    component:ServiceListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'services/add',
    component: ServiceFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'services/edit/:Id_service',
    component: ServiceFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'operations',
    component: OperationListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'operations/add',
    component: OperationFormComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'operations/edit/:Id_operation',
    component: OperationFormComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
