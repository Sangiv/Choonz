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

import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.persistence.repository.ArtistRepository;
import com.qa.choonz.rest.dto.ArtistDTO;


@SpringBootTest
class ArtistServiceUnitTest {

    @Autowired
    private ArtistService service;

    @MockBean
    private ArtistRepository repo;

    @MockBean
    private ModelMapper modelMapper;


    private List<Artist> artists;
    private Artist testArtist;
    private Artist testArtistWithId;
    private ArtistDTO artistDTO;

    final Long id = 1L;
    final String testName = "Arsenal";

    @BeforeEach
    void init() {
        this.artists = new ArrayList<>();
        this.testArtist = new Artist(testName);
        this.artists.add(testArtist);
        this.testArtistWithId = new Artist(testArtist.getName());
        this.testArtistWithId.setId(id);
        this.artistDTO = modelMapper.map(testArtistWithId, ArtistDTO.class);
    }

    @Test
    void createTest() {

        when(this.repo.save(this.testArtist)).thenReturn(this.testArtistWithId);

        when(this.modelMapper.map(this.testArtistWithId, ArtistDTO.class)).thenReturn(this.artistDTO);

        ArtistDTO expected = this.artistDTO;
        ArtistDTO actual = this.service.create(this.testArtist);
        assertThat(expected).isEqualTo(actual);

        verify(this.repo, times(1)).save(this.testArtist);
    }

    @Test
    void readOneTest() {

        when(this.repo.findById(this.id)).thenReturn(Optional.of(this.testArtistWithId));

        when(this.modelMapper.map(this.testArtistWithId, ArtistDTO.class)).thenReturn(this.artistDTO);

        assertThat(this.artistDTO).isEqualTo(this.service.read(this.id));

        verify(this.repo, times(1)).findById(this.id);
    }

    @Test
    void readAllTest() {

        when(this.repo.findAll()).thenReturn(this.artists);

        when(this.modelMapper.map(this.testArtistWithId, ArtistDTO.class)).thenReturn(this.artistDTO);

        assertThat(this.service.read().isEmpty()).isFalse();

        verify(this.repo, times(1)).findAll();
    }

    @Test
    void updateTest() {
    	Artist artist = new Artist("BVB");
        artist.setId(this.id);

        ArtistDTO artistDTO = new ArtistDTO(null, "BVB");

        Artist updatedArtist = new Artist(artistDTO.getName());
        updatedArtist.setId(this.id);

        ArtistDTO updatedArtistDTO = new ArtistDTO(this.id, updatedArtist.getName());

        when(this.repo.findById(this.id)).thenReturn(Optional.of(artist));

        when(this.repo.save(artist)).thenReturn(updatedArtist);

        when(this.modelMapper.map(updatedArtist, ArtistDTO.class)).thenReturn(updatedArtistDTO);

        assertThat(updatedArtistDTO).isEqualTo(this.service.update(artistDTO, this.id));

        verify(this.repo, times(1)).findById(1L);
        verify(this.repo, times(1)).save(updatedArtist);
    }

    @Test
    void deleteTest() {

        when(this.repo.existsById(id)).thenReturn(true, false);

        assertThat(this.service.delete(id)).isTrue();

        verify(this.repo, times(1)).deleteById(id);

        verify(this.repo, times(2)).existsById(id);
    }

}