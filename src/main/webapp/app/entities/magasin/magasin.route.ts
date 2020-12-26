import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IMagasin, Magasin } from 'app/shared/model/magasin.model';
import { MagasinService } from './magasin.service';
import { MagasinComponent } from './magasin.component';
import { MagasinDetailComponent } from './magasin-detail.component';
import { MagasinUpdateComponent } from './magasin-update.component';

@Injectable({ providedIn: 'root' })
export class MagasinResolve implements Resolve<IMagasin> {
  constructor(private service: MagasinService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IMagasin> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((magasin: HttpResponse<Magasin>) => {
          if (magasin.body) {
            return of(magasin.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Magasin());
  }
}

export const magasinRoute: Routes = [
  {
    path: '',
    component: MagasinComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Magasins',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: MagasinDetailComponent,
    resolve: {
      magasin: MagasinResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Magasins',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: MagasinUpdateComponent,
    resolve: {
      magasin: MagasinResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Magasins',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: MagasinUpdateComponent,
    resolve: {
      magasin: MagasinResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Magasins',
    },
    canActivate: [UserRouteAccessService],
  },
];
