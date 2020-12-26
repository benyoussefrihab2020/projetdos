import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IOuvrier, Ouvrier } from 'app/shared/model/ouvrier.model';
import { OuvrierService } from './ouvrier.service';
import { OuvrierComponent } from './ouvrier.component';
import { OuvrierDetailComponent } from './ouvrier-detail.component';
import { OuvrierUpdateComponent } from './ouvrier-update.component';

@Injectable({ providedIn: 'root' })
export class OuvrierResolve implements Resolve<IOuvrier> {
  constructor(private service: OuvrierService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IOuvrier> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((ouvrier: HttpResponse<Ouvrier>) => {
          if (ouvrier.body) {
            return of(ouvrier.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new Ouvrier());
  }
}

export const ouvrierRoute: Routes = [
  {
    path: '',
    component: OuvrierComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ouvriers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: OuvrierDetailComponent,
    resolve: {
      ouvrier: OuvrierResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ouvriers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: OuvrierUpdateComponent,
    resolve: {
      ouvrier: OuvrierResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ouvriers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: OuvrierUpdateComponent,
    resolve: {
      ouvrier: OuvrierResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'Ouvriers',
    },
    canActivate: [UserRouteAccessService],
  },
];
