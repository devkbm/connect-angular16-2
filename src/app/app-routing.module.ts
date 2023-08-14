import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayoutComponent } from './app-layout/app-layout.component';
import { AuthGuardService } from './core/service/auth-guard.service';
import { LoginComponent } from './login/login.component';
import { Login2Component } from './login/login2.component';
import { Login3Component } from './login/login3.component';

const routes: Routes = [
  {path: '', redirectTo: 'login', pathMatch: 'full'},
  {path: 'login/:id', component: LoginComponent },
  {path: 'login', component: LoginComponent },
  {path: 'login2', component: Login2Component },
  {path: 'login3', component: Login3Component },
  {path: 'home', component: AppLayoutComponent, canActivateChild: [AuthGuardService]},
  {path: 'test', loadChildren: () => import('./pages/welcome/welcome.module').then(m => m.WelcomeModule)},
  {path: 'system', loadChildren: () => import('src/app/system/system-management.module').then(m => m.SystemManagementModule)},
  {path: 'hrm', loadChildren: () => import('src/app/hrm/hrm.module').then(m => m.HrmModule)},
  {path: 'grw', loadChildren: () => import('src/app/cooperation/cooperation.module').then(m => m.CooperationModule)}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
