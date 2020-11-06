package com.qa.choonz.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.qa.choonz.rest.dto.GenreDTO;
import com.qa.choonz.persistence.domain.Genre;
import com.qa.choonz.persistence.repository.GenreRepository;


@SpringBootTest
class GenreServiceIntegrationTest {

    @Autowired
    private GenreService service;

    @Autowired
    private GenreRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    private GenreDTO mapToDTO(Genre genre) {
        return this.modelMapper.map(genre, GenreDTO.class);
    }

    private Genre testGenre;
    private Genre testGenreWithId;
    private GenreDTO testGenreDTO;

    private Long id;
    private final String name = "Pop";
    private final String description = "Pop";

    
    @BeforeEach
    void init() {
        this.repo.deleteAll();
        this.testGenre= new Genre(name, description);
        this.testGenreWithId = this.repo.save(this.testGenre);
        this.testGenreDTO = this.mapToDTO(testGenreWithId);
        this.id = this.testGenreWithId.getId();
    }

    @Test
    void testCreate() {
        assertThat(this.testGenreDTO)
            .isEqualTo(this.service.create(testGenre));
    }

    @Test
    void testReadOne() {
        assertThat(this.testGenreDTO)
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
        .isEqualTo(Stream.of(this.testGenreDTO)
                .collect(Collectors.toList()));
    }

    @Test
    void testUpdate() {
    	GenreDTO newGenre = new GenreDTO(null, "BVB", "Team");
    	GenreDTO updatedGenre = new GenreDTO(this.id, newGenre.getName(), newGenre.getDescription());

        assertThat(updatedGenre)
            .isEqualTo(this.service.update(newGenre, this.id));
    }

    @Test
    void testDelete() {
        assertThat(this.service.delete(this.id)).isTrue();
    }

}
