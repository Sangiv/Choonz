package com.qa.choonz.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.qa.choonz.rest.dto.AlbumDTO;
import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.repository.AlbumRepository;


@SpringBootTest
class AlbumServiceIntegrationTest {

    @Autowired
    private AlbumService service;

    @Autowired
    private AlbumRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    private AlbumDTO mapToDTO(Album album) {
        return this.modelMapper.map(album, AlbumDTO.class);
    }

    private Album testAlbum;
    private Album testAlbumWithId;
    private AlbumDTO testAlbumDTO;

    private Long id;
    private final String name = "Ocean Eyes";

    
    @BeforeEach
    void init() {
        this.repo.deleteAll();
        this.testAlbum= new Album(name);
        this.testAlbumWithId = this.repo.save(this.testAlbum);
        this.testAlbumDTO = this.mapToDTO(testAlbumWithId);
        this.id = this.testAlbumWithId.getId();
    }

    @Test
    void testCreate() {
        assertThat(this.testAlbumDTO)
            .isEqualTo(this.service.create(testAlbum));
    }

    @Test
    void testReadOne() {
//        assertThat(this.testAlbumDTO)
//                .isEqualTo(this.service.read(this.id));
        assertThat(this.service.read(this.testAlbumWithId.getId()))
        .isEqualTo(this.mapToDTO(this.testAlbumWithId));
    }

    @Test
    void testReadAll() {
        assertThat(this.service.read())
                .isEqualTo(Stream.of(this.mapToDTO(testAlbumWithId))
                        .collect(Collectors.toList()));
    }

    @Test
    void testUpdate() {
    	AlbumDTO newAlbum = new AlbumDTO(null, "BVB");
    	AlbumDTO updatedAlbum = new AlbumDTO(this.id, newAlbum.getName());

        assertThat(updatedAlbum)
            .isEqualTo(this.service.update(newAlbum, this.id));
    }

    @Test
    void testDelete() {
        assertThat(this.service.delete(this.id)).isTrue();
    }

}
