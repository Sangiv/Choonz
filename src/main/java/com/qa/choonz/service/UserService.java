package com.qa.choonz.service;


import com.qa.choonz.exception.UserNotFoundException;
import com.qa.choonz.persistence.domain.Users;
import com.qa.choonz.persistence.repository.UserRepository;
import com.qa.choonz.rest.dto.UserDTO;
import com.qa.choonz.utils.BeanUtils;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {
    public UserRepository repo;
    private ModelMapper mapper;

    @Autowired
    public UserService(UserRepository repo, ModelMapper mapper) {
        this.repo = repo;
        this.mapper = mapper;
    }
    private UserDTO mapToDTO(Users users){
        return this.mapper.map(users, UserDTO.class);
    }
    public UserDTO createUser(Users user){
        Users created = this.repo.save(user);
        return this.mapToDTO(created);
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
        BeanUtils.mergeNotNull(userDTO,toUpdate);
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
