import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './landing-pages/pages/home/home.component';
import { BlogComponent } from './landing-pages/pages/blog/blog.component';
import { BlogDetailsComponent } from './landing-pages/pages/blog-details/blog-details.component';
import { ComingSoonComponent } from './landing-pages/pages/coming-soon/coming-soon.component';
import { NotFoundComponent } from './landing-pages/pages/not-found/not-found.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'home', component: HomeComponent },
    { path: 'index', component: HomeComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog-details', component: BlogDetailsComponent },
    { path: 'coming-soon', component: ComingSoonComponent },
    { path: '404', component: NotFoundComponent },
    {
      path: 'account',
      loadChildren: () =>
        import('./core/Components/Auth/account.module').then(
          (m) => m.AccountModule
        ),
    },
    {
      path: 'dashboard',
      loadChildren: () =>
        import('./dashboard/dashboard.module').then(
          (m) => m.DashboardModule
        ),
    },
    { path: '**', redirectTo: '/404' },
 ];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
