package com.gestionmagasin.app.web.rest;

import com.gestionmagasin.app.domain.Ouvrier;
import com.gestionmagasin.app.repository.OuvrierRepository;
import com.gestionmagasin.app.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.gestionmagasin.app.domain.Ouvrier}.
 */
@RestController
@RequestMapping("/api")
@Transactional
public class OuvrierResource {

    private final Logger log = LoggerFactory.getLogger(OuvrierResource.class);

    private static final String ENTITY_NAME = "ouvrier";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final OuvrierRepository ouvrierRepository;

    public OuvrierResource(OuvrierRepository ouvrierRepository) {
        this.ouvrierRepository = ouvrierRepository;
    }

    /**
     * {@code POST  /ouvriers} : Create a new ouvrier.
     *
     * @param ouvrier the ouvrier to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new ouvrier, or with status {@code 400 (Bad Request)} if the ouvrier has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/ouvriers")
    public ResponseEntity<Ouvrier> createOuvrier(@RequestBody Ouvrier ouvrier) throws URISyntaxException {
        log.debug("REST request to save Ouvrier : {}", ouvrier);
        if (ouvrier.getId() != null) {
            throw new BadRequestAlertException("A new ouvrier cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Ouvrier result = ouvrierRepository.save(ouvrier);
        return ResponseEntity.created(new URI("/api/ouvriers/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /ouvriers} : Updates an existing ouvrier.
     *
     * @param ouvrier the ouvrier to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated ouvrier,
     * or with status {@code 400 (Bad Request)} if the ouvrier is not valid,
     * or with status {@code 500 (Internal Server Error)} if the ouvrier couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/ouvriers")
    public ResponseEntity<Ouvrier> updateOuvrier(@RequestBody Ouvrier ouvrier) throws URISyntaxException {
        log.debug("REST request to update Ouvrier : {}", ouvrier);
        if (ouvrier.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        Ouvrier result = ouvrierRepository.save(ouvrier);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, ouvrier.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /ouvriers} : get all the ouvriers.
     *
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of ouvriers in body.
     */
    @GetMapping("/ouvriers")
    public List<Ouvrier> getAllOuvriers() {
        log.debug("REST request to get all Ouvriers");
        return ouvrierRepository.findAll();
    }

    /**
     * {@code GET  /ouvriers/:id} : get the "id" ouvrier.
     *
     * @param id the id of the ouvrier to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the ouvrier, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/ouvriers/{id}")
    public ResponseEntity<Ouvrier> getOuvrier(@PathVariable Long id) {
        log.debug("REST request to get Ouvrier : {}", id);
        Optional<Ouvrier> ouvrier = ouvrierRepository.findById(id);
        return ResponseUtil.wrapOrNotFound(ouvrier);
    }

    /**
     * {@code DELETE  /ouvriers/:id} : delete the "id" ouvrier.
     *
     * @param id the id of the ouvrier to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/ouvriers/{id}")
    public ResponseEntity<Void> deleteOuvrier(@PathVariable Long id) {
        log.debug("REST request to delete Ouvrier : {}", id);
        ouvrierRepository.deleteById(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
