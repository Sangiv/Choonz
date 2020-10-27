package com.qa.choonz.rest.dto;

import lombok.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

//converting our POJO to JSON
public class UserDTO {
    private Long user_id;

    private String user_name;
    private String password;

    private List<PlaylistDTO> playList = new ArrayList<>();

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

    public UserDTO() {
    }

    public UserDTO( String user_name, String password) {
        this.user_name = user_name;
        this.password = password;
    }

    public UserDTO(String user_name, String password, List<PlaylistDTO> playList) {
        this.user_name = user_name;
        this.password = password;
        this.playList = playList;
    }

    public UserDTO(Long user_id, String user_name, String password, List<PlaylistDTO> playList) {
        this.user_id = user_id;
        this.user_name = user_name;
        this.password = password;
        this.playList = playList;
    }

    public void setPlayList(List<PlaylistDTO> playList) {
        this.playList = playList;
    }

    public List<PlaylistDTO> getPlayList() {
        return playList;
    }

    @Override
    public boolean equals(Object obj) {
        if (this == obj) {
            return true;
        }
        if (!(obj instanceof UserDTO)) {
            return false;
        }
        UserDTO other = (UserDTO) obj;
        return Objects.equals(user_name, other.user_name) && Objects.equals(password, other.password) && user_id.equals(other.user_id) && Objects.equals(playList, other.playList);
    }

    @Override
    public int hashCode() {
        return Objects.hash(user_id, user_name, password, playList);
    }

}
