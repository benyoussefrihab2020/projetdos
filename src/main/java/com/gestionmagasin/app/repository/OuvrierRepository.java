package com.gestionmagasin.app.repository;

import com.gestionmagasin.app.domain.Ouvrier;

import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;

/**
 * Spring Data  repository for the Ouvrier entity.
 */
@SuppressWarnings("unused")
@Repository
public interface OuvrierRepository extends JpaRepository<Ouvrier, Long> {
}
