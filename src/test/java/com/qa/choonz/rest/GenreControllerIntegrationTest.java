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
import com.qa.choonz.rest.dto.GenreDTO;
import com.qa.choonz.persistence.domain.Genre;
import com.qa.choonz.persistence.repository.GenreRepository;


@SpringBootTest
@AutoConfigureMockMvc
public class GenreControllerIntegrationTest {

    @Autowired
    private MockMvc mock;

    @Autowired
    private GenreRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ObjectMapper objectMapper;

    private Genre testGenre; 
    private Genre testGenreWithID;
    private GenreDTO genreDTO;

    private Long id;
    private String testName;

    private GenreDTO mapToDTO(Genre genre) {
        return this.modelMapper.map(genre, GenreDTO.class);
    }

    @BeforeEach
    void init() {
        this.repo.deleteAll();

        this.testGenre = new Genre("Pop");
        this.testGenreWithID = this.repo.save(this.testGenre);
        this.genreDTO = this.mapToDTO(testGenreWithID);

        this.id = this.testGenreWithID.getId();
        this.testName = this.testGenreWithID.getName();
    }

    @Test
    void testCreate() throws Exception {
        this.mock
                .perform(request(HttpMethod.POST, "/genres/create").contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(testGenre))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().json(this.objectMapper.writeValueAsString(genreDTO)));
    }

    @Test
    void testReadOne() throws Exception {
        this.mock.perform(request(HttpMethod.GET, "/genres/read/" + this.id).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(this.objectMapper.writeValueAsString(this.genreDTO)));
    }

    @Test
    void testReadAll() throws Exception {
        List<GenreDTO> genres = new ArrayList<>();
        genres.add(this.genreDTO);

        String content = this.mock
                .perform(request(HttpMethod.GET, "/genres/read").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        assertEquals(this.objectMapper.writeValueAsString(genres), content);
    }

    @Test
    void testUpdate() throws Exception {
    	GenreDTO newGenre = new GenreDTO(null, "Arsenal");
    	Genre updatedGenre = new Genre(newGenre.getName());
        updatedGenre.setId(this.id);

        String result = this.mock
                .perform(request(HttpMethod.PUT, "/genres/update/" + this.id).accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(newGenre)))
                .andExpect(status().isAccepted()).andReturn().getResponse().getContentAsString();

        assertEquals(this.objectMapper.writeValueAsString(this.mapToDTO(updatedGenre)), result);
    }

    @Test
    void testDelete() throws Exception {
        this.mock.perform(request(HttpMethod.DELETE, "/genres/delete/" + this.id)).andExpect(status().isNoContent());
    }

}
