package com.qa.choonz.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.qa.choonz.rest.dto.PlaylistDTO;
import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.persistence.repository.PlaylistRepository;


@SpringBootTest
class PlaylistServiceIntegrationTest {

    @Autowired
    private PlaylistService service;

    @Autowired
    private PlaylistRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    private PlaylistDTO mapToDTO(Playlist playlist) {
        return this.modelMapper.map(playlist, PlaylistDTO.class);
    }

    private Playlist testPlaylist;
    private Playlist testPlaylistWithId;
    private PlaylistDTO testPlaylistDTO;

    private Long id;
    private final String NAME = "Mix";
    private final String DESCRIPTION = "Mix";
    private final String ARTWORK = "Image";
    
    @BeforeEach
    void init() {
        this.repo.deleteAll();
        this.testPlaylist= new Playlist(NAME, DESCRIPTION, ARTWORK);
        this.testPlaylistWithId = this.repo.save(this.testPlaylist);
        this.testPlaylistDTO = this.mapToDTO(testPlaylistWithId);
        this.id = this.testPlaylistWithId.getId();
    }

    @Test
    void testCreate() {
        assertThat(this.testPlaylistDTO)
            .isEqualTo(this.service.create(testPlaylist));
    }

    @Test
    void testReadOne() {
        assertThat(this.testPlaylistDTO)
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
        .isEqualTo(Stream.of(this.testPlaylistDTO)
                .collect(Collectors.toList()));
    }

    @Test
    void testUpdate() {
    	PlaylistDTO newPlaylist = new PlaylistDTO(null, "BVB", "Team", "Badge");
    	PlaylistDTO updatedPlaylist = new PlaylistDTO(this.id, newPlaylist.getName(), newPlaylist.getDescription(), newPlaylist.getArtwork());

        assertThat(updatedPlaylist)
            .isEqualTo(this.service.update(newPlaylist, this.id));
    }

    @Test
    void testDelete() {
        assertThat(this.service.delete(this.id)).isTrue();
    }

}
