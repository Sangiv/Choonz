package com.qa.choonz.rest;

import com.qa.Todo.controller.UserController;
import com.qa.Todo.dto.TaskDTO;
import com.qa.Todo.dto.UserDTO;
import com.qa.Todo.presistence.domain.Users;
import com.qa.Todo.services.UserService;


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
    private static final String TEST_FIRST_NAME = "Joni";
    private static final String TEST_SURNAME = "Baki";
    private static final String TEST_USER_NAME = "mjoni";
    private static final String TEST_EMAIL = "mjoni@qa.com";
    private static final String TEST_PASS = "123456";

    @BeforeEach
    void init() {
        this.userList = new ArrayList<>();
        this.testUser = new Users(TEST_FIRST_NAME,TEST_SURNAME,TEST_USER_NAME,TEST_EMAIL,TEST_PASS);
        this.testUserWithId = new Users(testUser.getFirst_name(),testUser.getSurname(),testUser.getUser_name(),testUser.getEmail(),testUser.getPassword());
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
        //final List<TaskDTO> task = new ArrayList<>();
        UserDTO oldUser = new UserDTO(null, TEST_FIRST_NAME,TEST_SURNAME,TEST_USER_NAME,TEST_EMAIL,TEST_PASS);
        UserDTO newUser = new UserDTO(this.id, oldUser.getFirst_name(), oldUser.getSurname(),
                oldUser.getUser_name(), oldUser.getEmail(),oldUser.getPassword());

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