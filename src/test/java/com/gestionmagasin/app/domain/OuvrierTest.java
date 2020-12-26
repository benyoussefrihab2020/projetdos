package com.gestionmagasin.app.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.gestionmagasin.app.web.rest.TestUtil;

public class OuvrierTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Ouvrier.class);
        Ouvrier ouvrier1 = new Ouvrier();
        ouvrier1.setId(1L);
        Ouvrier ouvrier2 = new Ouvrier();
        ouvrier2.setId(ouvrier1.getId());
        assertThat(ouvrier1).isEqualTo(ouvrier2);
        ouvrier2.setId(2L);
        assertThat(ouvrier1).isNotEqualTo(ouvrier2);
        ouvrier1.setId(null);
        assertThat(ouvrier1).isNotEqualTo(ouvrier2);
    }
}
