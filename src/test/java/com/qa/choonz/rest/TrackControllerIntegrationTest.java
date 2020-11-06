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
import com.qa.choonz.rest.dto.TrackDTO;
import com.qa.choonz.persistence.domain.Track;
import com.qa.choonz.persistence.repository.TrackRepository;


@SpringBootTest
@AutoConfigureMockMvc
public class TrackControllerIntegrationTest {

    @Autowired
    private MockMvc mock;

    @Autowired
    private TrackRepository repo;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private ObjectMapper objectMapper;

    private Track testTrack; 
    private Track testTrackWithID;
    private TrackDTO trackDTO;

    private Long id;
    private String testName;

    private TrackDTO mapToDTO(Track track) {
        return this.modelMapper.map(track, TrackDTO.class);
    }

    @BeforeEach
    void init() {
        this.repo.deleteAll();

        this.testTrack = new Track("Fireflies");
        this.testTrackWithID = this.repo.save(this.testTrack);
        this.trackDTO = this.mapToDTO(testTrackWithID);

        this.id = this.testTrackWithID.getId();
        this.testName = this.testTrackWithID.getName();
    }

    @Test
    void testCreate() throws Exception {
        this.mock
                .perform(request(HttpMethod.POST, "/tracks/create").contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(testTrack))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().json(this.objectMapper.writeValueAsString(trackDTO)));
    }

    @Test
    void testReadOne() throws Exception {
        this.mock
        		.perform(request(HttpMethod.GET, "/tracks/read/" + this.id)
        				.accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(this.objectMapper.writeValueAsString(this.trackDTO)));
    }

    @Test
    void testReadAll() throws Exception {
        List<TrackDTO> tracks = new ArrayList<>();
        tracks.add(this.trackDTO);

        String content = this.mock
                .perform(request(HttpMethod.GET, "/tracks/read").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

//        assertEquals(this.objectMapper.writeValueAsString(albums), content);
    }

    @Test
    void testUpdate() throws Exception {
    	TrackDTO newTrack = new TrackDTO(null, "Arsenal");
    	Track updatedTrack = new Track(newTrack.getName());
        updatedTrack.setId(this.id);

        String result = this.mock
                .perform(request(HttpMethod.PUT, "/tracks/update/" + this.id).accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(newTrack)))
                .andExpect(status().isAccepted()).andReturn().getResponse().getContentAsString();

        assertEquals(this.objectMapper.writeValueAsString(this.mapToDTO(updatedTrack)), result);
    }

    @Test
    void testDelete() throws Exception {
        this.mock.perform(request(HttpMethod.DELETE, "/tracks/delete/" + this.id)).andExpect(status().isNoContent());
    }

}
