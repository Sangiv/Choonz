package com.qa.choonz.rest;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.qa.choonz.persistence.domain.Users;
import com.qa.choonz.persistence.repository.UserRepository;
import com.qa.choonz.rest.dto.UserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.ArrayList;
import java.util.List;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.request;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
public class UserControllerIntegrationTest {

    @Autowired
    private MockMvc mock;

    @Autowired
    private UserRepository repo;
    private ModelMapper modelMapper = new ModelMapper();

    private ObjectMapper objectMapper = new ObjectMapper();

    private Long id;
    private Users testUsers;
    private Users testUserWithId;
    private UserDTO userDTO;

    private final String TEST_USER_NAME = "test";
    private final String TEST_PASS = "123456";


    private final String TEST_UPDATE_USER_NAME = "update";
    private final String TEST_UPDATE_PASS = "update";


    private UserDTO mapToDTO(Users users) {
        return this.modelMapper.map(users, UserDTO.class);
    }

    @BeforeEach
    void init() {

        this.repo.deleteAll();
        this.testUsers = new Users(TEST_USER_NAME, TEST_PASS);
        this.testUserWithId = this.repo.saveAndFlush(this.testUsers);
        this.id = this.testUserWithId.getUser_id();

        this.userDTO  = new UserDTO(this.testUsers.getUser_name(),this.testUsers.getPassword());
        this.userDTO.setUser_id(this.id);
    }

    @Test
    void testCreate() throws Exception {
        this.mock
                .perform(request(HttpMethod.POST, "/users/create")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(this.testUsers))
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isCreated())
                .andExpect(content().json(this.objectMapper.writeValueAsString(this.userDTO)));
    }

    @Test
    void testRead() throws Exception {
        this.mock
                .perform(request(HttpMethod.GET, "/users/read/" + this.id)
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(content().json(this.objectMapper.writeValueAsString(this.userDTO)));
    }

    @Test
    void testReadAll() throws Exception {
        List<Users> usersList = new ArrayList<>();
        usersList.add(this.testUserWithId);

        String content = this.mock
                .perform(request(HttpMethod.GET, "/users/read")
                        .accept(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andReturn().getResponse().getContentAsString();

//        assertEquals(this.objectMapper.writeValueAsString(usersList), content);
    }

    @Test
    void testUpdate() throws Exception {
        UserDTO newUsers = new UserDTO(TEST_UPDATE_USER_NAME,TEST_UPDATE_PASS);
        newUsers.setUser_id(this.id);
//        Users updatedUsers = new Users(newUsers.getFirstName(),
//                newUsers.getSurname(), newUsers.getUserName(), newUsers.getEmail(), newUsers.getPassword());
//        updatedUsers.setUserId(this.id);

        String result = this.mock
                .perform(request(HttpMethod.PUT, "/users/update/" + this.id)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(this.objectMapper.writeValueAsString(newUsers)))
                .andExpect(status().isAccepted())
                .andReturn().getResponse().getContentAsString();

//        assertEquals(this.objectMapper.writeValueAsString(this.mapToDTO(updatedUsers)), result);
    }

    @Test
    void testDelete() throws Exception {
        this.mock
                .perform(request(HttpMethod.DELETE, "/users/delete/" + this.id))
                .andExpect(status().isNoContent());
    }
}
