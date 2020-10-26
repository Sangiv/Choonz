package com.qa.Todo.presistence.domain;


import lombok.*;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@SuppressWarnings("ALL")
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
@EqualsAndHashCode
public class Users {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column
    private Long user_id;
    @Column
    private String first_name;
    @Column
    private String surname;

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Users users = (Users) o;
        return user_id.equals(users.user_id) &&
                first_name.equals(users.first_name) &&
                surname.equals(users.surname) &&
                user_name.equals(users.user_name) &&
                email.equals(users.email) &&
                password.equals(users.password);
               // tasks.equals(users.tasks);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, first_name, surname, user_name, email, password, tasks);
    }

    @Column

    private String user_name;
    @Column
    private String email;

    @Column
    private String password;

    @OneToMany(mappedBy = "users", fetch =  FetchType.EAGER, cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Tasks> tasks;

    @Override
    public String toString() {
        return "Users{" +
                "userId=" + user_id +
                ", firstName='" + first_name + '\'' +
                ", surname='" + surname + '\'' +
                ", userName='" + user_name + '\'' +
                ", email='" + email + '\'' +
                ", password='" + password + '\'' +
                '}';
    }

    public Users(Long user_id, String first_name, String surname, String user_name, String email, String password) {
        this.user_id = user_id;
        this.first_name = first_name;
        this.surname = surname;
        this.user_name = user_name;
        this.email = email;
        this.password = password;
    }
    public Users(String first_name, String surname, String user_name, String email, String password) {
        this.first_name = first_name;
        this.surname = surname;
        this.user_name = user_name;
        this.email = email;
        this.password = password;
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

    public List<Tasks> getTasks() {

        return tasks;
    }

    public void setTasks(List<Tasks> tasks) {
        this.tasks.clear();
        this.tasks.addAll(tasks);
    }

}
