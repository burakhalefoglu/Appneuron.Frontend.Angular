import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './landing-pages/layout/header/header.component';
import { FooterComponent } from './landing-pages/layout/footer/footer.component';
import { SidebarComponent } from './landing-pages/layout/sidebar/sidebar.component';
import { FunfactComponent } from './landing-pages/common/funfact/funfact.component';
import { PartnerComponent } from './landing-pages/common/partner/partner.component';
import { HomeComponent } from './landing-pages/pages/home/home.component';
import { BlogComponent } from './landing-pages/pages/blog/blog.component';
import { BlogDetailsComponent } from './landing-pages/pages/blog-details/blog-details.component';
import { ComingSoonComponent } from './landing-pages/pages/coming-soon/coming-soon.component';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    FunfactComponent,
    PartnerComponent,
    AppComponent,
    BlogComponent,
    BlogDetailsComponent,
    ComingSoonComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
