import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionmagasinTestModule } from '../../../test.module';
import { MagasinComponent } from 'app/entities/magasin/magasin.component';
import { MagasinService } from 'app/entities/magasin/magasin.service';
import { Magasin } from 'app/shared/model/magasin.model';

describe('Component Tests', () => {
  describe('Magasin Management Component', () => {
    let comp: MagasinComponent;
    let fixture: ComponentFixture<MagasinComponent>;
    let service: MagasinService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionmagasinTestModule],
        declarations: [MagasinComponent],
      })
        .overrideTemplate(MagasinComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(MagasinComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(MagasinService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Magasin(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.magasins && comp.magasins[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
