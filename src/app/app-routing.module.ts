import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {HomeComponent} from '@landing-pages/pages/home/home.component';
import {BlogComponent} from '@landing-pages/pages/blog/blog.component';
import {BlogDetailsComponent} from '@landing-pages/pages/blog-details/blog-details.component';
import {ComingSoonComponent} from '@landing-pages/pages/coming-soon/coming-soon.component';
import {NotFoundComponent} from '@landing-pages/pages/not-found/not-found.component';
import {ForgotComponent} from '@auth/forgot/forgot.component';
import {LoginOrRegisterComponent} from '@auth/login-or-register/login-or-register.component';
import {ResetComponent} from '@auth/reset/reset.component';
import {AuthGuard} from '@core/guard/auth.guard';
import {ProfileComponent} from '@app/profile/profile.component';


const routes: Routes = [
    {path: '', component: HomeComponent},
    {path: 'home', component: HomeComponent},
    {path: 'index', component: HomeComponent},
    {path: 'blog', component: BlogComponent},
    {path: 'blog-details', component: BlogDetailsComponent},
    {path: 'coming-soon', component: ComingSoonComponent},
    {path: '404', component: NotFoundComponent},
    {path: 'auth', component: LoginOrRegisterComponent},
    {path: 'reset', component: ResetComponent},

    {path: 'profile', component: ProfileComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./dashboard/dashboard.module')
            .then(m => m.DashboardModule),
        canActivate: [AuthGuard]
    },

    {path: '**', redirectTo: '/404'},
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
