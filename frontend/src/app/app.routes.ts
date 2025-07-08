import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/Admin/login/login-page/login-page.component';
import { DashboardComponent } from './pages/Admin/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/Server/main-layout/main-layout.component';
import { HeaderComponent } from './layouts/Server/header/header.component';
import { ControlContainer } from '@angular/forms';
import { ControlRobotComponent } from './pages/Admin/control-robot/control-robot.component';
import { HomeComponent } from './pages/Client/home/home.component';
import { MainComponent } from './layouts/Client/main/main.component';
export const routes: Routes = [
  // { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },

  {
    path: 'admin',
    component: MainLayoutComponent, // layout cha
    children: [
      { path: 'dashboard', component: DashboardComponent },
      { path: 'control', component: ControlRobotComponent }
      // hiển thị tại <router-outlet>
      // ... các route khác
    ],
  },
  { path: 'home', component: MainComponent },

  // { path: '**', redirectTo: 'login' },
];
