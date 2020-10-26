package com.qa.Todo.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
//converting our POJO to JSON
public class UserDTO {
    private Long user_id;
    private String first_name;
    private String surname;
    private String user_name;
    private String email;
    private String password;
    private List<TaskDTO> tasks;

    public List<TaskDTO> getTasks() {
        return tasks;
    }
    public void setTasks(List<TaskDTO> tasks) {
//        this.tasks.clear();
//        this.tasks.addAll(tasks);
        this.tasks=tasks;
    }


    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }

    public String getFirst_name() {
        return first_name;
    }

    public void setFirst_name(String first_name) {
        this.first_name = first_name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserDTO(Long user_id, String first_name, String surname, String user_name, String email, String password) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.surname = surname;
        this.user_name = user_name;
        this.email = email;
        this.password = password;
//        this.tasks = tasks;
    }

    public UserDTO(String first_name, String surname, String user_name, String email, String password) {
        this.first_name = first_name;
        this.surname = surname;
        this.user_name = user_name;
        this.email = email;
        this.password = password;
    }

}
