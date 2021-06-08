import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import { AdminLayoutComponent } from './shared/components/admin-layout/admin-layout.component';
import { LoginPageComponent } from './login-page/login-page.component';
import { DashboardPageComponent } from './dashboard-page/dashboard-page.component';
import { CreatePageComponent } from './create-page/create-page.component';
import { EditPageComponent } from './edit-page/edit-page.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { AuthGuard } from './shared/services/auth.guard';
import { LoginGuard } from './shared/services/login.guard';
import { SearchPipe } from './shared/search.pipe';
import { AlertComponent } from './shared/components/alert/alert.component';
import { AlertService } from './shared/services/alert.service';
@NgModule({
  declarations: [AdminLayoutComponent, LoginPageComponent, DashboardPageComponent, CreatePageComponent, EditPageComponent, SearchPipe, AlertComponent],
  imports: [
    CommonModule, // щоб були  доступні всі директиви та пайпи
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild([ // замість файла router module прописумо тут роути
      {
        path: '', component: AdminLayoutComponent, children: [ // /admin
          {path: '', redirectTo: '/admin/login', pathMatch: 'full'}, //regirect to login page
          {path: 'login', component: LoginPageComponent, canActivate: [LoginGuard]}, 
          {path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard]},
          {path: 'create', component: CreatePageComponent, canActivate: [AuthGuard]}, 
          {path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard]}, 
        
        ]
      }
    ])
  ],
  exports: [RouterModule],
  providers: [AuthGuard, LoginGuard, AlertService]
})

export class AdminModule {

}

