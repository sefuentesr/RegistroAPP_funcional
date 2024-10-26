import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { NotFoundPage } from './not-found/not-found.page';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then(m => m.HomePageModule),
    canActivate: [AuthGuard], 
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginPageModule),
  },
  {
    path: 'reset-password',
    loadChildren: () => import('./reset-password/reset-password.module').then(m => m.ResetPasswordPageModule),
  },
  {
    path: 'register', 
    loadChildren: () => import('./register/register.module').then(m => m.RegisterPageModule) 
  }, 
  
  { 
    path: 'profile', 
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfilePageModule), 
    canActivate: [AuthGuard] 
  }, 
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'not-found',
    loadChildren: () => import('./not-found/not-found.module').then( m => m.NotFoundPageModule)
  },
  { 
    path: 'not-found', component: NotFoundPage 
  }, 
  { 
    path: '**', redirectTo: 'not-found' 
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
