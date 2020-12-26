package com.gestionmagasin.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.gestionmagasin.app.web.rest.TestUtil;

public class MagasinTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Magasin.class);
        Magasin magasin1 = new Magasin();
        magasin1.setId(1L);
        Magasin magasin2 = new Magasin();
        magasin2.setId(magasin1.getId());
        assertThat(magasin1).isEqualTo(magasin2);
        magasin2.setId(2L);
        assertThat(magasin1).isNotEqualTo(magasin2);
        magasin1.setId(null);
        assertThat(magasin1).isNotEqualTo(magasin2);
    }
}
