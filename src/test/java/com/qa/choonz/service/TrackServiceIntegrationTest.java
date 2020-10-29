package com.qa.choonz.service;

import static org.assertj.core.api.Assertions.assertThat;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import com.qa.choonz.rest.dto.TrackDTO;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.persistence.repository.TrackRepository;


@SpringBootTest
class TrackServiceIntegrationTest {

    @Autowired
    private TrackService service;

    @Autowired
    private TrackRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    private TrackDTO mapToDTO(Track track) {
        return this.modelMapper.map(track, TrackDTO.class);
    }

    private Track testTrack;
    private Track testTrackWithId;
    private TrackDTO testTrackDTO;

    private Long id;
    private final String name = "Ocean Eyes";

    
    @BeforeEach
    void init() {
        this.repo.deleteAll();
        this.testTrack= new Track(name);
        this.testTrackWithId = this.repo.save(this.testTrack);
        this.testTrackDTO = this.mapToDTO(testTrackWithId);
        this.id = this.testTrackWithId.getId();
    }

    @Test
    void testCreate() {
        assertThat(this.testTrackDTO)
            .isEqualTo(this.service.create(testTrack));
    }

    @Test
    void testReadOne() {
        assertThat(this.testTrackDTO)
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
        .isEqualTo(Stream.of(this.testTrackDTO)
                .collect(Collectors.toList()));
    }

    @Test
    void testUpdate() {
    	TrackDTO newTrack = new TrackDTO(null, "BVB");
    	TrackDTO updatedTrack = new TrackDTO(this.id, newTrack.getName());

        assertThat(updatedTrack)
            .isEqualTo(this.service.update(newTrack, this.id));
    }

    @Test
    void testDelete() {
        assertThat(this.service.delete(this.id)).isTrue();
    }

}
