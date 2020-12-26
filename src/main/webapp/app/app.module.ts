import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { GestionmagasinSharedModule } from 'app/shared/shared.module';
import { GestionmagasinCoreModule } from 'app/core/core.module';
import { GestionmagasinAppRoutingModule } from './app-routing.module';
import { GestionmagasinHomeModule } from './home/home.module';
import { GestionmagasinEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';

@NgModule({
  imports: [
    BrowserModule,
    GestionmagasinSharedModule,
    GestionmagasinCoreModule,
    GestionmagasinHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    GestionmagasinEntityModule,
    GestionmagasinAppRoutingModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class GestionmagasinAppModule {}
