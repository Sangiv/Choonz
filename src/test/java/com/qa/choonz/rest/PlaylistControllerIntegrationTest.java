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
import com.qa.choonz.rest.dto.PlaylistDTO;
import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.persistence.repository.PlaylistRepository;


@SpringBootTest
@AutoConfigureMockMvc
public class PlaylistControllerIntegrationTest {

    @Autowired
    private MockMvc mock;

    @Autowired
    private PlaylistRepository repo;

    private ModelMapper modelMapper = new ModelMapper();

    private ObjectMapper objectMapper = new ObjectMapper();

    private Playlist testPlaylist; 
    private Playlist testPlaylistWithID;
    private PlaylistDTO playlistDTO;

    private Long id;
    private  final String TEST_NAME = "Test Mix";
    private  final String TEST_ARTWORK = "Test Art";
    private  final String TEST_DESCRIPTION = "Test Mix";

    private  final String UPDATE_TEST_NAME = "Update MIX";
    private  final String UPDATE_TEST_ARTWORK = "Update Art";
    private  final String UPDATE_TEST_DESCRIPTION = "Update Mix";

    private PlaylistDTO mapToDTO(Playlist playlist) {
        return this.modelMapper.map(playlist, PlaylistDTO.class);
    }

    @BeforeEach
    void init() {
        this.repo.deleteAll();

        this.testPlaylist = new Playlist(this.TEST_NAME,  this.TEST_DESCRIPTION,this.TEST_ARTWORK);
        this.testPlaylistWithID = this.repo.saveAndFlush(this.testPlaylist);
        this.id = this.testPlaylistWithID.getId();
        this.playlistDTO = new PlaylistDTO(this.testPlaylist.getName(),this.testPlaylist.getDescription(),
                this.testPlaylist.getArtwork());
        this.playlistDTO.setId(this.id);
    }

    @Test
    void testCreate() throws Exception {
        this.mock
                .perform(request(HttpMethod.POST, "/playlists/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(this.testPlaylist))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().json(this.objectMapper.writeValueAsString(this.playlistDTO)));
    }

    @Test
    void testReadOne() throws Exception {
        this.mock.perform(request(HttpMethod.GET, "/playlists/read/" + this.id).accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(this.objectMapper.writeValueAsString(this.playlistDTO)));
    }

    @Test
    void testReadAll() throws Exception {
        List<PlaylistDTO> playlist = new ArrayList<>();
        playlist.add(this.playlistDTO);

        String content = this.mock
                .perform(request(HttpMethod.GET, "/playlists/read").accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk()).andReturn().getResponse().getContentAsString();

        assertEquals(this.objectMapper.writeValueAsString(playlist), content);
    }

    @Test
    void testUpdate() throws Exception {
    	final PlaylistDTO newPlaylist = new PlaylistDTO(UPDATE_TEST_NAME,UPDATE_TEST_DESCRIPTION,UPDATE_TEST_ARTWORK);
    	newPlaylist.setId(this.id);
    	Playlist updatedPlaylist = new Playlist(newPlaylist.getName(), newPlaylist.getDescription(), newPlaylist.getArtwork());
        updatedPlaylist.setId(this.id);

        String result = this.mock
                .perform(request(HttpMethod.PUT, "/playlists/update/" + this.id)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(newPlaylist)))
                .andExpect(status().isAccepted()).andReturn().getResponse().getContentAsString();

        assertEquals(this.objectMapper.writeValueAsString(this.mapToDTO(updatedPlaylist)), result);
    }

    @Test
    void testDelete() throws Exception {
        this.mock.perform(request(HttpMethod.DELETE, "/playlists/delete/" + this.id)).andExpect(status().isNoContent());
    }

}
