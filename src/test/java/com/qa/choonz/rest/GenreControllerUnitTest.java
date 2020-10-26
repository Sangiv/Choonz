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

import com.qa.choonz.persistence.domain.Genre;
import com.qa.choonz.rest.controller.GenreController;
import com.qa.choonz.rest.dto.GenreDTO;
import com.qa.choonz.service.GenreService;

@SpringBootTest
public class GenreControllerUnitTest {
	
	@Autowired
	private GenreController controller;
	
	@Autowired
	private ModelMapper mapper;
	
	@MockBean
    private GenreService service;

    private List<Genre> genre;
    private Genre testGenre;
    private Genre testGenreWithID;
    private GenreDTO genreDTO;
    private final Long id = 1L;

    private GenreDTO mapToDTO(Genre genre) {
        return this.mapper.map(genre, GenreDTO.class);
    }
    
    @BeforeEach
    void init() {
        this.genre = new ArrayList<>();
        this.testGenre = new Genre("Owl City");
        this.testGenreWithID = new Genre(testGenre.getName());
        this.testGenreWithID.setId(id);
        this.genre.add(testGenreWithID);
        this.genreDTO = this.mapToDTO(testGenreWithID);
    }
    
    @Test
    void createTest() {
        when(this.service.create(testGenre))
            .thenReturn(this.genreDTO);
        
        assertThat(new ResponseEntity<GenreDTO>(this.genreDTO, HttpStatus.CREATED))
                .isEqualTo(this.controller.create(testGenre));
        
        verify(this.service, times(1))
            .create(this.testGenre);
    }
    
    @Test
    void readOneTest() {
        when(this.service.read(this.id))
            .thenReturn(this.genreDTO);
        
        assertThat(new ResponseEntity<GenreDTO>(this.genreDTO, HttpStatus.OK))
                .isEqualTo(this.controller.read(this.id));
        
        verify(this.service, times(1))
            .read(this.id);
    }

    @Test
    void readAllTest() {
        when(service.read())
            .thenReturn(this.genre
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
    	GenreDTO newGenre = new GenreDTO(null, "Arsenal");
    	GenreDTO updatedGenre = new GenreDTO(this.id, newGenre.getName());

        when(this.service.update(newGenre, this.id))
            .thenReturn(updatedGenre);
        
        assertThat(new ResponseEntity<GenreDTO>(updatedGenre, HttpStatus.ACCEPTED))
                .isEqualTo(this.controller.update(this.id, newGenre));
        
        verify(this.service, times(1))
            .update(newGenre, this.id);
    }
    
    @Test
    void deleteTest() {
        this.controller.delete(id);

        verify(this.service, times(1))
            .delete(id);
    }
}
