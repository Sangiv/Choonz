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

import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.persistence.repository.PlaylistRepository;
import com.qa.choonz.rest.dto.PlaylistDTO;


@SpringBootTest
class PlaylistServiceUnitTest {

    @Autowired
    private PlaylistService service;

    @MockBean
    private GenreRepository repo;

    @MockBean
    private ModelMapper modelMapper;


    private List<Genre> genres;
    private Genre testGenre;
    private Genre testGenreWithId;
    private GenreDTO genreDTO;

    final Long id = 1L;
    final String testName = "Arsenal";

    @BeforeEach
    void init() {
        this.genres = new ArrayList<>();
        this.testGenre = new Genre(testName);
        this.genres.add(testGenre);
        this.testGenreWithId = new Genre(testGenre.getName());
        this.testGenreWithId.setId(id);
        this.genreDTO = modelMapper.map(testGenreWithId, GenreDTO.class);
    }

    @Test
    void createTest() {

        when(this.repo.save(this.testGenre)).thenReturn(this.testGenreWithId);

        when(this.modelMapper.map(this.testGenreWithId, GenreDTO.class)).thenReturn(this.genreDTO);

        GenreDTO expected = this.genreDTO;
        GenreDTO actual = this.service.create(this.testGenre);
        assertThat(expected).isEqualTo(actual);

        verify(this.repo, times(1)).save(this.testGenre);
    }

    @Test
    void readOneTest() {

        when(this.repo.findById(this.id)).thenReturn(Optional.of(this.testGenreWithId));

        when(this.modelMapper.map(this.testGenreWithId, GenreDTO.class)).thenReturn(this.genreDTO);

        assertThat(this.genreDTO).isEqualTo(this.service.read(this.id));

        verify(this.repo, times(1)).findById(this.id);
    }

    @Test
    void readAllTest() {

        when(this.repo.findAll()).thenReturn(this.genres);

        when(this.modelMapper.map(this.testGenreWithId, GenreDTO.class)).thenReturn(this.genreDTO);

        assertThat(this.service.read().isEmpty()).isFalse();

        verify(this.repo, times(1)).findAll();
    }

    @Test
    void updateTest() {
    	Genre genre = new Genre("BVB");
        genre.setId(this.id);

        GenreDTO genreDTO = new GenreDTO(null, "BVB");

        Genre updatedGenre = new Genre(genreDTO.getName());
        updatedGenre.setId(this.id);

        GenreDTO updatedGenreDTO = new GenreDTO(this.id, updatedGenre.getName());

        when(this.repo.findById(this.id)).thenReturn(Optional.of(genre));

        when(this.repo.save(genre)).thenReturn(updatedGenre);

        when(this.modelMapper.map(updatedGenre, GenreDTO.class)).thenReturn(updatedGenreDTO);

        assertThat(updatedGenreDTO).isEqualTo(this.service.update(genreDTO, this.id));

        verify(this.repo, times(1)).findById(1L);
        verify(this.repo, times(1)).save(updatedGenre);
    }

    @Test
    void deleteTest() {

        when(this.repo.existsById(id)).thenReturn(true, false);

        assertThat(this.service.delete(id)).isTrue();

        verify(this.repo, times(1)).deleteById(id);

        verify(this.repo, times(2)).existsById(id);
    }

}