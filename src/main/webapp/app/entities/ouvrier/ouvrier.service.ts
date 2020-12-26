import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { SERVER_API_URL } from 'app/app.constants';
import { createRequestOption } from 'app/shared/util/request-util';
import { IOuvrier } from 'app/shared/model/ouvrier.model';

type EntityResponseType = HttpResponse<IOuvrier>;
type EntityArrayResponseType = HttpResponse<IOuvrier[]>;

@Injectable({ providedIn: 'root' })
export class OuvrierService {
  public resourceUrl = SERVER_API_URL + 'api/ouvriers';

  constructor(protected http: HttpClient) {}

  create(ouvrier: IOuvrier): Observable<EntityResponseType> {
    return this.http.post<IOuvrier>(this.resourceUrl, ouvrier, { observe: 'response' });
  }

  update(ouvrier: IOuvrier): Observable<EntityResponseType> {
    return this.http.put<IOuvrier>(this.resourceUrl, ouvrier, { observe: 'response' });
  }

  find(id: number): Observable<EntityResponseType> {
    return this.http.get<IOuvrier>(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }

  query(req?: any): Observable<EntityArrayResponseType> {
    const options = createRequestOption(req);
    return this.http.get<IOuvrier[]>(this.resourceUrl, { params: options, observe: 'response' });
  }

  delete(id: number): Observable<HttpResponse<{}>> {
    return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response' });
  }
}
