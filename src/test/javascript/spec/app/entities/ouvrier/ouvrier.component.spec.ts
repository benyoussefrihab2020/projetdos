import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { GestionmagasinTestModule } from '../../../test.module';
import { OuvrierComponent } from 'app/entities/ouvrier/ouvrier.component';
import { OuvrierService } from 'app/entities/ouvrier/ouvrier.service';
import { Ouvrier } from 'app/shared/model/ouvrier.model';

describe('Component Tests', () => {
  describe('Ouvrier Management Component', () => {
    let comp: OuvrierComponent;
    let fixture: ComponentFixture<OuvrierComponent>;
    let service: OuvrierService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [GestionmagasinTestModule],
        declarations: [OuvrierComponent],
      })
        .overrideTemplate(OuvrierComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(OuvrierComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(OuvrierService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new Ouvrier(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.ouvriers && comp.ouvriers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
