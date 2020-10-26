package com.qa.choonz.rest;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.qa.choonz.persistence.domain.Artist;
import com.qa.choonz.rest.controller.ArtistController;
import com.qa.choonz.rest.dto.ArtistDTO;
import com.qa.choonz.service.ArtistService;

@SpringBootTest
public class ArtistControllerUnitTest {
	
	@Autowired
	private ArtistController controller;
	
	@Autowired
	private ModelMapper mapper;
	
	@MockBean
    private ArtistService service;

    private List<Artist> artists;
    private Artist testArtist;
    private Artist testArtistWithID;
    private ArtistDTO artistDTO;
    private final Long id = 1L;

    private ArtistDTO mapToDTO(Artist artist) {
        return this.mapper.map(artist, ArtistDTO.class);
    }
    
    @BeforeEach
    void init() {
        this.artists = new ArrayList<>();
        this.testArtist = new Artist("Owl City");
        this.testArtistWithID = new Artist(testArtist.getName());
        this.testArtistWithID.setId(id);
        this.artists.add(testArtistWithID);
        this.artistDTO = this.mapToDTO(testArtistWithID);
    }
    
    @Test
    void createTest() {
        when(this.service.create(testArtist))
            .thenReturn(this.artistDTO);
        
        assertThat(new ResponseEntity<ArtistDTO>(this.artistDTO, HttpStatus.CREATED))
                .isEqualTo(this.controller.create(testArtist));
        
        verify(this.service, times(1))
            .create(this.testArtist);
    }
    
    @Test
    void readOneTest() {
        when(this.service.read(this.id))
            .thenReturn(this.artistDTO);
        
        assertThat(new ResponseEntity<ArtistDTO>(this.artistDTO, HttpStatus.OK))
                .isEqualTo(this.controller.read(this.id));
        
        verify(this.service, times(1))
            .read(this.id);
    }

    @Test
    void readAllTest() {
        when(service.read())
            .thenReturn(this.artists
                    .stream()
                    .map(this::mapToDTO)
                    .collect(Collectors.toList()));
        
        assertThat(this.controller.read().getBody()
                .isEmpty()).isFalse();
        
        verify(this.service, times(1))
            .read();
    }
    
    @Test
    void updateTest() {
        // given
    	ArtistDTO newArtist= new ArtistDTO(null, "Arsenal");
    	ArtistDTO updatedArtist= new ArtistDTO(this.id, newArtist.getName());

        when(this.service.update(newArtist, this.id))
            .thenReturn(updatedArtist);
        
        assertThat(new ResponseEntity<ArtistDTO>(updatedArtist, HttpStatus.ACCEPTED))
                .isEqualTo(this.controller.update(this.id, newArtist));
        
        verify(this.service, times(1))
            .update(newArtist, this.id);
    }
    
    @Test
    void deleteTest() {
        this.controller.delete(id);

        verify(this.service, times(1))
            .delete(id);
    }
}
