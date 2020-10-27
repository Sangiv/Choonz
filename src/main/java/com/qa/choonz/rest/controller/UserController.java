package com.qa.choonz.rest.controller;

import com.qa.choonz.persistence.domain.Users;
import com.qa.choonz.rest.dto.UserDTO;
import com.qa.choonz.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin

@RequestMapping("/users")
public class UserController {
    private UserService service;
    public UserController(UserService service) {
        this.service = service;
    }
    //create
    @PostMapping("/create")
    public ResponseEntity<UserDTO> create(@RequestBody Users user){
        System.out.println(user.getClass());
        UserDTO created = this.service.createUser(user);
        return new ResponseEntity<>(created, HttpStatus.CREATED);
    }
    //readAll
    @GetMapping("/read")
    public ResponseEntity<List<UserDTO>> read(){
        return ResponseEntity.ok(this.service.readAllUsers());
    }
    //readById
    @GetMapping("/read/{userId}")
    public ResponseEntity<UserDTO> readByID(@PathVariable Long userId){
        return ResponseEntity.ok(this.service.read(userId));
    }
    //update
    @PutMapping("/update/{userId}")
    public ResponseEntity<UserDTO> update(@RequestBody UserDTO userDTO,@PathVariable Long userId){
        UserDTO updated = this.service.update(userDTO,userId);
        return new ResponseEntity<>(updated, HttpStatus.ACCEPTED);
    }
    //delete
    @DeleteMapping("/delete/{userId}")
    public ResponseEntity<UserDTO> delete(@PathVariable Long userId){
        return this.service.delete(userId)
                ? new ResponseEntity<>(HttpStatus.NO_CONTENT)
                : new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }
}

