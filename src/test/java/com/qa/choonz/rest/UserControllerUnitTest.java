package com.qa.choonz.rest;


import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.times;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

import com.qa.choonz.persistence.domain.Users;
import com.qa.choonz.rest.controller.UserController;
import com.qa.choonz.rest.dto.PlaylistDTO;
import com.qa.choonz.rest.dto.UserDTO;
import com.qa.choonz.service.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;


@SpringBootTest
class UserControllerUnitTest {

    @Autowired
    private UserController controller;

    @MockBean
    private UserService service;

    @Autowired
    private ModelMapper modelMapper;

    private UserDTO mapToDTO(Users user) {
        return this.modelMapper.map(user, UserDTO.class);
    }

    private List<Users> userList;
    private Users testUser;
    private Users testUserWithId;
    private UserDTO userDTO;

    private final Long id = 1L;
    private static final String TEST_USER_NAME = "test";
    private static final String TEST_PASS = "123456";

    @BeforeEach
    void init() {
        this.userList = new ArrayList<>();
        this.testUser = new Users(TEST_USER_NAME,TEST_PASS);
        this.testUserWithId = new Users(testUser.getUser_name(),testUser.getPassword());
        this.testUserWithId.setUser_id(this.id);
        this.userList.add(this.testUserWithId);
    }

    @Test
    void createTest() throws Exception {
        when(this.service.createUser(this.testUser)).thenReturn(this.userDTO);
        assertThat(new ResponseEntity<UserDTO>(this.userDTO, HttpStatus.CREATED))
                .isEqualTo(this.controller.create(this.testUser));
        verify(this.service, times(1)).createUser(this.testUser);
    }

    @Test
    void readOneTest() throws Exception {
        when(this.service.read(this.id)).thenReturn(this.userDTO);
        assertThat(new ResponseEntity<UserDTO>(this.userDTO, HttpStatus.OK)).isEqualTo(this.controller.readByID(this.id));
        verify(this.service, times(1)).read(this.id);
    }

    @Test
    void readAllTest() throws Exception {
        when(this.service.readAllUsers()).thenReturn((List<UserDTO>) this.userList.stream().map(this::mapToDTO).collect(Collectors.toList()));
        assertThat(this.controller.read().getBody().isEmpty()).isFalse();
        verify(this.service, times(1)).readAllUsers();
    }

    @Test
    void updateTest() throws Exception {
        final List<PlaylistDTO> playlist = new ArrayList<>();
        UserDTO oldUser = new UserDTO(TEST_USER_NAME,TEST_PASS);
        oldUser.setUser_id(null);
        UserDTO newUser = new UserDTO(oldUser.getUser_name(),oldUser.getPassword());
        userDTO.setUser_id(oldUser.getUser_id());

        when(this.service.update(oldUser, this.id)).thenReturn(newUser);
        assertThat(new ResponseEntity<UserDTO>(newUser, HttpStatus.ACCEPTED))
                .isEqualTo(this.controller.update(oldUser, this.id));
        verify(this.service, times(1)).update(oldUser, this.id);
    }

    @Test
    void deleteTest() throws Exception {
        this.controller.delete(this.id);
        verify(this.service, times(1)).delete(this.id);
    }
}