package com.qa.choonz.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.qa.choonz.rest.dto.ArtistDTO;
import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.persistence.repository.ArtistRepository;


@SpringBootTest
class ArtistServiceIntegrationTest {

    @Autowired
    private ArtistService service;

    @Autowired
    private ArtistRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    private ArtistDTO mapToDTO(Artist artist) {
        return this.modelMapper.map(artist, ArtistDTO.class);
    }

    private Artist testArtist;
    private Artist testArtistWithId;
    private ArtistDTO testArtistDTO;

    private Long id;
    private final String name = "Owl City";

    
    @BeforeEach
    void init() {
        this.repo.deleteAll();
        this.testArtist= new Artist(name);
        this.testArtistWithId = this.repo.save(this.testArtist);
        this.testArtistDTO = this.mapToDTO(testArtistWithId);
        this.id = this.testArtistWithId.getId();
    }

    @Test
    void testCreate() {
        assertThat(this.testArtistDTO)
            .isEqualTo(this.service.create(testArtist));
    }

    @Test
    void testReadOne() {
        assertThat(this.testArtistDTO)
                .isEqualTo(this.service.read(this.id));
//        assertThat(this.service.read(this.testAlbumWithId.getId()))
//        .isEqualTo(this.mapToDTO(this.testAlbumWithId));
    }

    @Test
    void testReadAll() {
//        assertThat(this.service.read())
//                .isEqualTo(Stream.of(this.mapToDTO(testAlbumWithId))
//                        .collect(Collectors.toList()));
        assertThat(this.service.read())
        .isEqualTo(Stream.of(this.testArtistDTO)
                .collect(Collectors.toList()));
    }

    @Test
    void testUpdate() {
    	ArtistDTO newArtist = new ArtistDTO(null, "BVB");
    	ArtistDTO updatedArtist = new ArtistDTO(this.id, newArtist.getName());

        assertThat(updatedArtist)
            .isEqualTo(this.service.update(newArtist, this.id));
    }

    @Test
    void testDelete() {
        assertThat(this.service.delete(this.id)).isTrue();
    }

}
