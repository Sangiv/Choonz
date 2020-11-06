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

import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.repository.AlbumRepository;
import com.qa.choonz.rest.dto.AlbumDTO;


@SpringBootTest
class AlbumServiceUnitTest {

    @Autowired
    private AlbumService service;

    @MockBean
    private AlbumRepository repo;

    @MockBean
    private ModelMapper modelMapper;


    private List<Album> albums;
    private Album testAlbum;
    private Album testAlbumWithId;
    private AlbumDTO albumDTO;

    final Long id = 1L;
    final String testName = "Arsenal";

    @BeforeEach
    void init() {
        this.albums = new ArrayList<>();
        this.testAlbum = new Album(testName);
        this.albums.add(testAlbum);
        this.testAlbumWithId = new Album(testAlbum.getName());
        this.testAlbumWithId.setId(id);
        this.albumDTO = modelMapper.map(testAlbumWithId, AlbumDTO.class);
    }

    @Test
    void createTest() {

        when(this.repo.save(this.testAlbum)).thenReturn(this.testAlbumWithId);

        when(this.modelMapper.map(this.testAlbumWithId, AlbumDTO.class)).thenReturn(this.albumDTO);

        AlbumDTO expected = this.albumDTO;
        AlbumDTO actual = this.service.create(this.testAlbum);
        assertThat(expected).isEqualTo(actual);

        verify(this.repo, times(1)).save(this.testAlbum);
    }

    @Test
    void readOneTest() {

        when(this.repo.findById(this.id)).thenReturn(Optional.of(this.testAlbumWithId));

        when(this.modelMapper.map(this.testAlbumWithId, AlbumDTO.class)).thenReturn(this.albumDTO);

        assertThat(this.albumDTO).isEqualTo(this.service.read(this.id));

        verify(this.repo, times(1)).findById(this.id);
    }

    @Test
    void readAllTest() {

        when(this.repo.findAll()).thenReturn(this.albums);

        when(this.modelMapper.map(this.testAlbumWithId, AlbumDTO.class)).thenReturn(this.albumDTO);

        assertThat(this.service.read().isEmpty()).isFalse();

        verify(this.repo, times(1)).findAll();
    }

    @Test
    void updateTest() {
        Album album = new Album("BVB");
        album.setId(this.id);

        AlbumDTO albumDTO = new AlbumDTO(null, "BVB");

        Album updatedAlbum = new Album(albumDTO.getName());
        updatedAlbum.setId(this.id);

        AlbumDTO updatedAlbumDTO = new AlbumDTO(this.id, updatedAlbum.getName());

        when(this.repo.findById(this.id)).thenReturn(Optional.of(album));

        when(this.repo.save(album)).thenReturn(updatedAlbum);

        when(this.modelMapper.map(updatedAlbum, AlbumDTO.class)).thenReturn(updatedAlbumDTO);

        assertThat(updatedAlbumDTO).isEqualTo(this.service.update(albumDTO, this.id));

        verify(this.repo, times(1)).findById(1L);
        verify(this.repo, times(1)).save(updatedAlbum);
    }

    @Test
    void deleteTest() {

        when(this.repo.existsById(id)).thenReturn(true, false);

        assertThat(this.service.delete(id)).isTrue();

        verify(this.repo, times(1)).deleteById(id);

        verify(this.repo, times(2)).existsById(id);
    }

}