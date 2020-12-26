import { IProduit } from 'app/shared/model/produit.model';
import { IOuvrier } from 'app/shared/model/ouvrier.model';

export interface IMagasin {
  id?: number;
  nom?: string;
  adresse?: string;
  description?: string;
  produits?: IProduit[];
  ouvriers?: IOuvrier[];
}

export class Magasin implements IMagasin {
  constructor(
    public id?: number,
    public nom?: string,
    public adresse?: string,
    public description?: string,
    public produits?: IProduit[],
    public ouvriers?: IOuvrier[]
  ) {}
}
