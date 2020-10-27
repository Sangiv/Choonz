package com.qa.choonz.rest;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

import java.util.ArrayList;
import java.util.List;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.choonz.rest.dto.AlbumDTO;
import com.qa.choonz.persistence.domain.Album;
import com.qa.choonz.persistence.repository.AlbumRepository;


@SpringBootTest
@AutoConfigureMockMvc
public class AlbumControllerIntegrationTest {

    @Autowired
    private MockMvc mock;

    @Autowired
    private AlbumRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ObjectMapper objectMapper;

    private Album testAlbum; 
    private Album testAlbumWithID;
    private AlbumDTO albumDTO;

    private Long id;
    private String testName;

    private AlbumDTO mapToDTO(Album album) {
        return this.modelMapper.map(album, AlbumDTO.class);
    }

    @BeforeEach
    void init() {
        this.repo.deleteAll();

        this.testAlbum = new Album("Ocean Eyes");
        this.testAlbumWithID = this.repo.save(this.testAlbum);
        this.albumDTO = this.mapToDTO(testAlbumWithID);

        this.id = this.testAlbumWithID.getId();
        this.testName = this.testAlbumWithID.getName();
    }

    @Test
    void testCreate() throws Exception {
        this.mock
                .perform(request(HttpMethod.POST, "/albums/create").contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(testAlbum))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().json(this.objectMapper.writeValueAsString(albumDTO)));
    }

    @Test
    void testReadOne() throws Exception {
        this.mock.perform(request(HttpMethod.GET, "/albums/read/" + this.id).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(this.objectMapper.writeValueAsString(this.albumDTO)));
    }

    @Test
    void testReadAll() throws Exception {
        List<AlbumDTO> albums = new ArrayList<>();
        albums.add(this.albumDTO);

        String content = this.mock
                .perform(request(HttpMethod.GET, "/albums/read").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        assertEquals(this.objectMapper.writeValueAsString(albums), content);
    }

    @Test
    void testUpdate() throws Exception {
    	AlbumDTO newAlbum = new AlbumDTO(null, "Arsenal");
    	Album updatedAlbum = new Album(newAlbum.getName());
        updatedAlbum.setId(this.id);

        String result = this.mock
                .perform(request(HttpMethod.PUT, "/albums/update/" + this.id).accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(newAlbum)))
                .andExpect(status().isAccepted()).andReturn().getResponse().getContentAsString();

        assertEquals(this.objectMapper.writeValueAsString(this.mapToDTO(updatedAlbum)), result);
    }

    @Test
    void testDelete() throws Exception {
        this.mock.perform(request(HttpMethod.DELETE, "/albums/delete/" + this.id)).andExpect(status().isNoContent());
    }

}
