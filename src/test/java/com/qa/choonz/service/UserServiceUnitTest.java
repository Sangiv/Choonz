package com.qa.choonz.service;

import com.qa.Todo.dto.UserDTO;
import com.qa.Todo.presistence.domain.Users;
import com.qa.Todo.presistence.repo.UserRepo;
import com.qa.Todo.services.UserService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.mock.mockito.MockBean;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.Mockito.*;
import static org.mockito.Mockito.times;

@SpringBootTest
public class UserServiceUnitTest {

    @Autowired
    private UserService service;

    @MockBean
    private UserRepo repo;

    @MockBean
    private ModelMapper mapper;

    private List<Users> userList;
    private Users testUser;
    private Users testUserWithID;
    private UserDTO userDTO;

    final long id = 1L;
    private final String TEST_FIRST_NAME = "Joni";
    private final String TEST_SURNAME = "Baki";
    private final String TEST_USER_NAME = "mjoni";
    private final String TEST_USER_EMAIL = "mjoni@qa.com";
    private final String TEST_PASS = "123456";

    private final String TEST_UPDATE_FIRST_NAME = "Roni";
    private final String TEST_UPDATE_SURNAME = "Taher";
    private final String TEST_UPDATE_USER_NAME = "rtaher";
    private final String TEST_UPDATE_PASS = "rtaher";

//    private UserDTO mapToDTO(Users user) {
//        return this.mapper.map(user, UserDTO.class);
//    }

    @BeforeEach
    void init() {
        this.userList = new ArrayList<>();
        this.testUser = new Users(TEST_FIRST_NAME, TEST_SURNAME, TEST_USER_NAME,TEST_USER_EMAIL,TEST_PASS);
        this.userList.add(testUser);
        this.testUserWithID = new Users(testUser.getFirst_name(), testUser.getSurname(), testUser.getUser_name(), testUser.getEmail(), testUser.getPassword());
        this.testUserWithID.setUser_id(id);
        this.userDTO = this.mapper.map(testUserWithID, UserDTO.class);
    }

    @Test
    void createUsersTest() {
        when(this.mapper.map(testUser, Users.class)).thenReturn(testUser);
        when(this.repo.save(testUser)).thenReturn(testUserWithID);
        when(this.mapper.map(testUserWithID, UserDTO.class)).thenReturn(userDTO);

        assertThat(this.userDTO).isEqualTo(this.service.createUser(this.testUser));

        verify(this.repo, times(1)).save(this.testUser);
    }

    @Test
    void deleteUsersTest() {
        when(this.repo.existsById(id)).thenReturn(true, false);

        assertThat(this.service.delete(id)).isTrue();

        verify(this.repo, times(1)).deleteById(id);
        verify(this.repo, times(2)).existsById(id);
    }

    @Test
    void findUsersByIDTest() {
        when(this.repo.findById(this.id)).thenReturn(Optional.of(this.testUserWithID));
        when(this.mapper.map(testUserWithID, UserDTO.class)).thenReturn(userDTO);

        assertThat(this.userDTO).isEqualTo(this.service.read(this.id));

        verify(this.repo, times(1)).findById(this.id);
    }

    @Test
    void readUserTest() {

        when(repo.findAll()).thenReturn(this.userList);
        when(this.mapper.map(testUserWithID, UserDTO.class)).thenReturn(userDTO);

        assertThat(this.service.readAllUsers().isEmpty()).isFalse();

        verify(repo, times(1)).findAll();
    }

    //TODO: Need to fix this update method
    @Test
    void updateUsersTest() {
        // given
        final long ID = 1L;
        UserDTO newUsers = new UserDTO(null, TEST_FIRST_NAME, TEST_SURNAME, TEST_USER_NAME,TEST_USER_EMAIL,TEST_PASS);
        Users user = new Users(TEST_UPDATE_FIRST_NAME, TEST_UPDATE_SURNAME,TEST_UPDATE_USER_NAME,TEST_USER_EMAIL,TEST_UPDATE_PASS);
        user.setUser_id(ID);
        Users updatedUsers = new Users(newUsers.getFirst_name(), newUsers.getSurname(), newUsers.getUser_name(), newUsers.getEmail(),newUsers.getPassword());
        updatedUsers.setUser_id(ID);
        UserDTO updatedDTO = new UserDTO(ID, updatedUsers.getFirst_name(), updatedUsers.getSurname(), updatedUsers.getUser_name(),updatedUsers.getEmail(),updatedUsers.getPassword());

        when(this.repo.findById(this.id)).thenReturn(Optional.of(user));
        // You NEED to configure a .equals() method in Users.java for this to work
        when(this.repo.save(updatedUsers)).thenReturn(updatedUsers);
        when(this.mapper.map(updatedUsers, UserDTO.class)).thenReturn(updatedDTO);

        assertThat(updatedDTO).isEqualTo(this.service.update(newUsers, this.id));

        verify(this.repo, times(1)).findById(1L);
        verify(this.repo, times(1)).save(updatedUsers);
    }
}
