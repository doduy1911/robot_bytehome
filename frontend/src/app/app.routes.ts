import { Routes } from '@angular/router';
import { LoginPageComponent } from './pages/login/login-page/login-page.component';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { MainLayoutComponent } from './layouts/main-layout/main-layout.component';
import { HeaderComponent } from './layouts/header/header.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginPageComponent },

  {path: '',
    component: MainLayoutComponent, // layout cha
    children: [
      { path: 'dashboard', component: DashboardComponent }, // hiển thị tại <router-outlet>
      // ... các route khác
    ],
  },
  { path: '**', redirectTo: 'login' },
  {path:"test",component:HeaderComponent}
];
