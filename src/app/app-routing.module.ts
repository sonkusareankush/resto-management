import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from 'src/services/auth.guard'; // Guard for logged-in users
import { LoginGuard } from 'src/services/login.guard'; // Guard for non-logged-in users


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./tabs/tabs.module').then(m => m.TabsPageModule),
    canActivate: [AuthGuard] // Protect main app with AuthGuard
  },
  {
    path: 'login',
    loadChildren: () => import('./Login/login/login.module').then(m => m.LoginPageModule),
    canActivate: [LoginGuard] // Protect login page with LoginGuard
  },
  {
    path: '**',
    redirectTo: '',  // Redirect all unknown paths to the default route
    pathMatch: 'full'
  }
];
@NgModule({
  imports: [
    // RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    RouterModule.forRoot(routes, { useHash: true }) // Enable hash-based routing

  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
