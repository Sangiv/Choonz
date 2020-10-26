package com.qa.choonz.service;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.persistence.repository.TrackRepository;
import com.qa.choonz.rest.dto.TrackDTO;


@SpringBootTest
class TrackServiceUnitTest {

    @Autowired
    private TrackService service;

    @MockBean
    private TrackRepository repo;

    @MockBean
    private ModelMapper modelMapper;


    private List<Track> tracks;
    private Track testTracklist;
    private Track testTrackWithId;
    private TrackDTO trackDTO;

    final Long id = 1L;
    final String testName = "Arsenal";

    @BeforeEach
    void init() {
        this.tracks = new ArrayList<>();
        this.testTracklist = new Track(testName);
        this.tracks.add(testTracklist);
        this.testTrackWithId = new Track(testTracklist.getName());
        this.testTrackWithId.setId(id);
        this.trackDTO = modelMapper.map(testTrackWithId, TrackDTO.class);
    }

    @Test
    void createTest() {

        when(this.repo.save(this.testTracklist)).thenReturn(this.testTrackWithId);

        when(this.modelMapper.map(this.testTrackWithId, TrackDTO.class)).thenReturn(this.trackDTO);

        TrackDTO expected = this.trackDTO;
        TrackDTO actual = this.service.create(this.testTracklist);
        assertThat(expected).isEqualTo(actual);

        verify(this.repo, times(1)).save(this.testTracklist);
    }

    @Test
    void readOneTest() {

        when(this.repo.findById(this.id)).thenReturn(Optional.of(this.testTrackWithId));

        when(this.modelMapper.map(this.testTrackWithId, TrackDTO.class)).thenReturn(this.trackDTO);

        assertThat(this.trackDTO).isEqualTo(this.service.read(this.id));

        verify(this.repo, times(1)).findById(this.id);
    }

    @Test
    void readAllTest() {

        when(this.repo.findAll()).thenReturn(this.tracks);

        when(this.modelMapper.map(this.testTrackWithId, TrackDTO.class)).thenReturn(this.trackDTO);

        assertThat(this.service.read().isEmpty()).isFalse();

        verify(this.repo, times(1)).findAll();
    }

    @Test
    void updateTest() {
    	Track track = new Track("BVB");
        track.setId(this.id);

        TrackDTO trackDTO = new TrackDTO(null, "BVB");

        Track updatedTrack = new Track(trackDTO.getName());
        updatedTrack.setId(this.id);

        TrackDTO updatedTrackDTO = new TrackDTO(this.id, updatedTrack.getName());

        when(this.repo.findById(this.id)).thenReturn(Optional.of(track));

        when(this.repo.save(track)).thenReturn(updatedTrack);

        when(this.modelMapper.map(updatedTrack, TrackDTO.class)).thenReturn(updatedTrackDTO);

        assertThat(updatedTrackDTO).isEqualTo(this.service.update(trackDTO, this.id));

        verify(this.repo, times(1)).findById(1L);
        verify(this.repo, times(1)).save(updatedTrack);
    }

    @Test
    void deleteTest() {

        when(this.repo.existsById(id)).thenReturn(true, false);

        assertThat(this.service.delete(id)).isTrue();

        verify(this.repo, times(1)).deleteById(id);

        verify(this.repo, times(2)).existsById(id);
    }

}