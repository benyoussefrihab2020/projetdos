package com.gestionmagasin.app.web.rest;

import com.gestionmagasin.app.GestionmagasinApp;
import com.gestionmagasin.app.domain.Ouvrier;
import com.gestionmagasin.app.repository.OuvrierRepository;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.transaction.annotation.Transactional;
import javax.persistence.EntityManager;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link OuvrierResource} REST controller.
 */
@SpringBootTest(classes = GestionmagasinApp.class)
@AutoConfigureMockMvc
@WithMockUser
public class OuvrierResourceIT {

    private static final String DEFAULT_NOM = "AAAAAAAAAA";
    private static final String UPDATED_NOM = "BBBBBBBBBB";

    private static final String DEFAULT_PRENOM = "AAAAAAAAAA";
    private static final String UPDATED_PRENOM = "BBBBBBBBBB";

    private static final String DEFAULT_ADRESSE = "AAAAAAAAAA";
    private static final String UPDATED_ADRESSE = "BBBBBBBBBB";

    private static final Double DEFAULT_SALAIRE = 1D;
    private static final Double UPDATED_SALAIRE = 2D;

    @Autowired
    private OuvrierRepository ouvrierRepository;

    @Autowired
    private EntityManager em;

    @Autowired
    private MockMvc restOuvrierMockMvc;

    private Ouvrier ouvrier;

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ouvrier createEntity(EntityManager em) {
        Ouvrier ouvrier = new Ouvrier()
            .nom(DEFAULT_NOM)
            .prenom(DEFAULT_PRENOM)
            .adresse(DEFAULT_ADRESSE)
            .salaire(DEFAULT_SALAIRE);
        return ouvrier;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Ouvrier createUpdatedEntity(EntityManager em) {
        Ouvrier ouvrier = new Ouvrier()
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .adresse(UPDATED_ADRESSE)
            .salaire(UPDATED_SALAIRE);
        return ouvrier;
    }

    @BeforeEach
    public void initTest() {
        ouvrier = createEntity(em);
    }

    @Test
    @Transactional
    public void createOuvrier() throws Exception {
        int databaseSizeBeforeCreate = ouvrierRepository.findAll().size();
        // Create the Ouvrier
        restOuvrierMockMvc.perform(post("/api/ouvriers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ouvrier)))
            .andExpect(status().isCreated());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeCreate + 1);
        Ouvrier testOuvrier = ouvrierList.get(ouvrierList.size() - 1);
        assertThat(testOuvrier.getNom()).isEqualTo(DEFAULT_NOM);
        assertThat(testOuvrier.getPrenom()).isEqualTo(DEFAULT_PRENOM);
        assertThat(testOuvrier.getAdresse()).isEqualTo(DEFAULT_ADRESSE);
        assertThat(testOuvrier.getSalaire()).isEqualTo(DEFAULT_SALAIRE);
    }

    @Test
    @Transactional
    public void createOuvrierWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = ouvrierRepository.findAll().size();

        // Create the Ouvrier with an existing ID
        ouvrier.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restOuvrierMockMvc.perform(post("/api/ouvriers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ouvrier)))
            .andExpect(status().isBadRequest());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllOuvriers() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        // Get all the ouvrierList
        restOuvrierMockMvc.perform(get("/api/ouvriers?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(ouvrier.getId().intValue())))
            .andExpect(jsonPath("$.[*].nom").value(hasItem(DEFAULT_NOM)))
            .andExpect(jsonPath("$.[*].prenom").value(hasItem(DEFAULT_PRENOM)))
            .andExpect(jsonPath("$.[*].adresse").value(hasItem(DEFAULT_ADRESSE)))
            .andExpect(jsonPath("$.[*].salaire").value(hasItem(DEFAULT_SALAIRE.doubleValue())));
    }
    
    @Test
    @Transactional
    public void getOuvrier() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        // Get the ouvrier
        restOuvrierMockMvc.perform(get("/api/ouvriers/{id}", ouvrier.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_VALUE))
            .andExpect(jsonPath("$.id").value(ouvrier.getId().intValue()))
            .andExpect(jsonPath("$.nom").value(DEFAULT_NOM))
            .andExpect(jsonPath("$.prenom").value(DEFAULT_PRENOM))
            .andExpect(jsonPath("$.adresse").value(DEFAULT_ADRESSE))
            .andExpect(jsonPath("$.salaire").value(DEFAULT_SALAIRE.doubleValue()));
    }
    @Test
    @Transactional
    public void getNonExistingOuvrier() throws Exception {
        // Get the ouvrier
        restOuvrierMockMvc.perform(get("/api/ouvriers/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateOuvrier() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();

        // Update the ouvrier
        Ouvrier updatedOuvrier = ouvrierRepository.findById(ouvrier.getId()).get();
        // Disconnect from session so that the updates on updatedOuvrier are not directly saved in db
        em.detach(updatedOuvrier);
        updatedOuvrier
            .nom(UPDATED_NOM)
            .prenom(UPDATED_PRENOM)
            .adresse(UPDATED_ADRESSE)
            .salaire(UPDATED_SALAIRE);

        restOuvrierMockMvc.perform(put("/api/ouvriers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(updatedOuvrier)))
            .andExpect(status().isOk());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
        Ouvrier testOuvrier = ouvrierList.get(ouvrierList.size() - 1);
        assertThat(testOuvrier.getNom()).isEqualTo(UPDATED_NOM);
        assertThat(testOuvrier.getPrenom()).isEqualTo(UPDATED_PRENOM);
        assertThat(testOuvrier.getAdresse()).isEqualTo(UPDATED_ADRESSE);
        assertThat(testOuvrier.getSalaire()).isEqualTo(UPDATED_SALAIRE);
    }

    @Test
    @Transactional
    public void updateNonExistingOuvrier() throws Exception {
        int databaseSizeBeforeUpdate = ouvrierRepository.findAll().size();

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restOuvrierMockMvc.perform(put("/api/ouvriers")
            .contentType(MediaType.APPLICATION_JSON)
            .content(TestUtil.convertObjectToJsonBytes(ouvrier)))
            .andExpect(status().isBadRequest());

        // Validate the Ouvrier in the database
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteOuvrier() throws Exception {
        // Initialize the database
        ouvrierRepository.saveAndFlush(ouvrier);

        int databaseSizeBeforeDelete = ouvrierRepository.findAll().size();

        // Delete the ouvrier
        restOuvrierMockMvc.perform(delete("/api/ouvriers/{id}", ouvrier.getId())
            .accept(MediaType.APPLICATION_JSON))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Ouvrier> ouvrierList = ouvrierRepository.findAll();
        assertThat(ouvrierList).hasSize(databaseSizeBeforeDelete - 1);
    }
}
