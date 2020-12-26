import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionmagasinTestModule } from '../../../test.module';
import { ProduitComponent } from 'app/entities/produit/produit.component';
import { ProduitService } from 'app/entities/produit/produit.service';
import { Produit } from 'app/shared/model/produit.model';

describe('Component Tests', () => {
  describe('Produit Management Component', () => {
    let comp: ProduitComponent;
    let fixture: ComponentFixture<ProduitComponent>;
    let service: ProduitService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionmagasinTestModule],
        declarations: [ProduitComponent],
      })
        .overrideTemplate(ProduitComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(ProduitComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(ProduitService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Produit(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.produits && comp.produits[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
