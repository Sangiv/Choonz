package com.qa.choonz.rest.dto;

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
    private String user_name;
    private String password;
    private List<PlaylistDTO> playlist;

    public List<PlaylistDTO> getPlayList() {
        return playlist;
    }
    public void setPlayList(List<PlaylistDTO> playlist) {
        this.playlist=playlist;
    }


    public Long getUser_id() {
        return user_id;
    }

    public void setUser_id(Long user_id) {
        this.user_id = user_id;
    }


    public String getUser_name() {
        return user_name;
    }

    public void setUser_name(String user_name) {
        this.user_name = user_name;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public UserDTO(Long user_id, String user_name,String password) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.password = password;
    }

    public UserDTO( String user_name, String password) {
        this.user_name = user_name;
        this.password = password;
    }

}
