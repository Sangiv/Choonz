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
    private UserRepository repo;

    @MockBean
    private ModelMapper mapper;

    private List<Users> userList;
    private Users testUser;
    private Users testUserWithID;
    private UserDTO userDTO;

    final Long id = 1L;
    private final String TEST_USER_NAME = "test";
    private final String TEST_PASS = "123456";


    private final String TEST_UPDATE_USER_NAME = "update";
    private final String TEST_UPDATE_PASS = "update";


//    private UserDTO mapToDTO(Users user) {
//        return this.mapper.map(user, UserDTO.class);
//    }

    @BeforeEach
    void init() {
        this.userList = new ArrayList<>();
        this.testUser = new Users(TEST_USER_NAME,TEST_PASS);
        this.userList.add(testUser);
        this.testUserWithID = new Users(testUser.getUser_name(), testUser.getPassword());
        this.testUserWithID.setUser_id(id);
        this.userDTO = this.mapper.map(testUserWithID, UserDTO.class);
    }

    @Test
    void createUsersTest() {
        when(this.repo.save(testUser)).thenReturn(testUserWithID);
        when(this.mapper.map(testUserWithID, UserDTO.class)).thenReturn(this.userDTO);

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

    @Test
    void updateUsersTest() {
        // given
        final Long ID = 1L;

        Users user = new Users(TEST_UPDATE_USER_NAME,TEST_UPDATE_PASS);
        user.setUser_id(ID);

        UserDTO newUsers = new UserDTO(TEST_USER_NAME,TEST_PASS);
        newUsers.setUser_id(null);

        Users updatedUsers = new Users(newUsers.getUser_name(),newUsers.getPassword());
        updatedUsers.setUser_id(ID);

        UserDTO updatedDTO = new UserDTO(updatedUsers.getUser_name(),updatedUsers.getPassword());
        updatedDTO.setUser_id(updatedUsers.getUser_id());

        when(this.repo.findById(this.id)).thenReturn(Optional.of(user));
        when(this.repo.save(user)).thenReturn(updatedUsers);
        when(this.mapper.map(updatedUsers, UserDTO.class)).thenReturn(updatedDTO);

        assertThat(updatedDTO).isEqualTo(this.service.update(newUsers, this.id));

        verify(this.repo, times(1)).findById(1L);
        verify(this.repo, times(1)).save(updatedUsers);
    }
}
