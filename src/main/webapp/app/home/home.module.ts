import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { GestionmagasinSharedModule } from 'app/shared/shared.module';
import { HOME_ROUTE } from './home.route';
import { HomeComponent } from './home.component';

@NgModule({
  imports: [GestionmagasinSharedModule, RouterModule.forChild([HOME_ROUTE])],
  declarations: [HomeComponent],
})
export class GestionmagasinHomeModule {}
