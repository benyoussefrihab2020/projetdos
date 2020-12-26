package com.gestionmagasin.app.domain;


import javax.persistence.*;

import java.io.Serializable;
import java.util.HashSet;
import java.util.Set;

/**
 * A Magasin.
 */
@Entity
@Table(name = "magasin")
public class Magasin implements Serializable {

    private static final long serialVersionUID = 1L;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "nom")
    private String nom;

    @Column(name = "adresse")
    private String adresse;

    @Column(name = "description")
    private String description;

    @OneToMany(mappedBy = "magasin")
    private Set<Produit> produits = new HashSet<>();

    @OneToMany(mappedBy = "magasin")
    private Set<Ouvrier> ouvriers = new HashSet<>();

    // jhipster-needle-entity-add-field - JHipster will add fields here
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getNom() {
        return nom;
    }

    public Magasin nom(String nom) {
        this.nom = nom;
        return this;
    }

    public void setNom(String nom) {
        this.nom = nom;
    }

    public String getAdresse() {
        return adresse;
    }

    public Magasin adresse(String adresse) {
        this.adresse = adresse;
        return this;
    }

    public void setAdresse(String adresse) {
        this.adresse = adresse;
    }

    public String getDescription() {
        return description;
    }

    public Magasin description(String description) {
        this.description = description;
        return this;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Set<Produit> getProduits() {
        return produits;
    }

    public Magasin produits(Set<Produit> produits) {
        this.produits = produits;
        return this;
    }

    public Magasin addProduit(Produit produit) {
        this.produits.add(produit);
        produit.setMagasin(this);
        return this;
    }

    public Magasin removeProduit(Produit produit) {
        this.produits.remove(produit);
        produit.setMagasin(null);
        return this;
    }

    public void setProduits(Set<Produit> produits) {
        this.produits = produits;
    }

    public Set<Ouvrier> getOuvriers() {
        return ouvriers;
    }

    public Magasin ouvriers(Set<Ouvrier> ouvriers) {
        this.ouvriers = ouvriers;
        return this;
    }

    public Magasin addOuvrier(Ouvrier ouvrier) {
        this.ouvriers.add(ouvrier);
        ouvrier.setMagasin(this);
        return this;
    }

    public Magasin removeOuvrier(Ouvrier ouvrier) {
        this.ouvriers.remove(ouvrier);
        ouvrier.setMagasin(null);
        return this;
    }

    public void setOuvriers(Set<Ouvrier> ouvriers) {
        this.ouvriers = ouvriers;
    }
    // jhipster-needle-entity-add-getters-setters - JHipster will add getters and setters here

    @Override
    public boolean equals(Object o) {
        if (this == o) {
            return true;
        }
        if (!(o instanceof Magasin)) {
            return false;
        }
        return id != null && id.equals(((Magasin) o).id);
    }

    @Override
    public int hashCode() {
        return 31;
    }

    // prettier-ignore
    @Override
    public String toString() {
        return "Magasin{" +
            "id=" + getId() +
            ", nom='" + getNom() + "'" +
            ", adresse='" + getAdresse() + "'" +
            ", description='" + getDescription() + "'" +
            "}";
    }
}
