package com.qa.Todo.services;

import com.qa.Todo.dto.UserDTO;
import com.qa.Todo.exception.UserNotFoundException;
import com.qa.Todo.presistence.domain.Users;
import com.qa.Todo.presistence.repo.UserRepo;
import com.qa.Todo.utils.TodoBeanUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    public UserRepo repo;
    private ModelMapper mapper;

    @Autowired
    public UserService(UserRepo repo, ModelMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }
    private UserDTO mapToDTO(Users users){
        return this.mapper.map(users, UserDTO.class);
    }
    private Users mapFromDTO(UserDTO userDTO){
        return this.mapper.map(userDTO, Users.class);
    }
    //create
//    public UserDTO createUser(UserDTO userDTO){
//        Users toSave = this.mapFromDTO(userDTO);
//        Users saved = this.repo.save(toSave);
//        return this.mapToDTO(saved);
//    }
    public UserDTO createUser(Users user){
        Users created = this.repo.save(user);
        UserDTO mapped = this.mapToDTO(created);
        return mapped;
    }
    //readAll
    public List<UserDTO> readAllUsers(){
        return this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }
    //readById
    public UserDTO read(Long userId){
        return this.mapToDTO(this.repo.findById(userId).orElseThrow(UserNotFoundException::new));
    }
    //update
    public UserDTO update(UserDTO userDTO,Long userId){
        Users toUpdate = this.repo.findById(userId).orElseThrow(UserNotFoundException::new);
        TodoBeanUtils.mergeNotNull(userDTO,toUpdate);
        return this.mapToDTO(this.repo.save(toUpdate));

    }
    //delete
    public boolean delete (Long userId){
        if (!this.repo.existsById(userId)) {
            throw new UserNotFoundException();
        }
        this.repo.deleteById(userId);
        return !this.repo.existsById(userId);
    }
}
