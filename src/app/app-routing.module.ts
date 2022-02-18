import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './landing-pages/pages/home/home.component';
import { BlogComponent } from './landing-pages/pages/blog/blog.component';
import { BlogDetailsComponent } from './landing-pages/pages/blog-details/blog-details.component';
import { ComingSoonComponent } from './landing-pages/pages/coming-soon/coming-soon.component';


const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'blog', component: BlogComponent },
    { path: 'blog-details', component: BlogDetailsComponent },
    { path: 'coming-soon', component: ComingSoonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
