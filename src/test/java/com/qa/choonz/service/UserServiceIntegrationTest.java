package com.qa.choonz.service;


import com.qa.choonz.persistence.domain.Users;
import com.qa.choonz.persistence.repository.UserRepository;
import com.qa.choonz.rest.dto.UserDTO;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
public class UserServiceIntegrationTest {
    @Autowired
    private UserService service;

    @MockBean
    private UserRepository repo;

    private Users testUser;

    private Users testUserWithID;

    private Long id;
    private UserDTO testUserDTO;

    private final String TEST_USER_NAME = "test";
    private final String TEST_PASS = "123456";


    private final String TEST_UPDATE_USER_NAME = "update";
    private final String TEST_UPDATE_PASS = "update";

    @MockBean
    private ModelMapper mapper;

    private UserDTO mapToDTO(Users task) {
        return this.mapper.map(task, UserDTO.class);
    }

    @BeforeEach
    void init() {
        this.repo.deleteAll();
        this.testUser = new Users(TEST_USER_NAME,TEST_PASS);
        this.testUserWithID = this.repo.save(this.testUser);
        this.testUserDTO = this.mapToDTO(testUserWithID);
        this.id = this.testUserWithID.getUser_id();

    }

    @Test
    void testCreateUser() {
        assertThat(this.testUserDTO)
                .isEqualTo(this.service.createUser(testUser));
    }


    @Test
    void testFindTaskByID() {
        assertThat(this.service.read(this.testUserWithID.getUser_id()))
                .isEqualTo(this.mapToDTO(this.testUserWithID));
    }

    @Test
    void testReadUsers() {
        assertThat(this.service.readAllUsers())
                .isEqualTo(Stream.of(this.mapToDTO(testUserWithID)).collect(Collectors.toList()));
    }

    @Test
    void testUpdateUser() {
        UserDTO newTask = new UserDTO(TEST_UPDATE_USER_NAME,TEST_UPDATE_PASS);
        UserDTO updatedTask = new UserDTO(newTask.getUser_name(), newTask.getPassword());
        updatedTask.setUser_id(this.testUserWithID.getUser_id());

        assertThat(this.service.update(newTask, this.testUserWithID.getUser_id())).isEqualTo(updatedTask);
    }
    @Test
    void testDeleteUser() {
        assertThat(this.service.delete(this.testUserWithID.getUser_id())).isTrue();
    }
}
