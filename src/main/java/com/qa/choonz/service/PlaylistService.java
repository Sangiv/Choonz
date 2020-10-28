package com.qa.choonz.service;

import java.util.List;
import java.util.stream.Collectors;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import com.qa.choonz.exception.PlaylistNotFoundException;
import com.qa.choonz.persistence.domain.Playlist;
import com.qa.choonz.persistence.repository.PlaylistRepository;
import com.qa.choonz.rest.dto.PlaylistDTO;
import com.qa.choonz.utils.BeanUtils;

@Service
public class PlaylistService {

    private PlaylistRepository repo;
    private ModelMapper mapper;

    public PlaylistService(PlaylistRepository repo, ModelMapper mapper) {
        super();
        this.repo = repo;
        this.mapper = mapper;
    }

    private PlaylistDTO mapToDTO(Playlist playlist) {
        return this.mapper.map(playlist, PlaylistDTO.class);
    }

    public PlaylistDTO create(Playlist playlist) {
        Playlist created = this.repo.save(playlist);
        return this.mapToDTO(created);
    }

    public List<PlaylistDTO> read() {
        return this.repo.findAll().stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    public PlaylistDTO read(Long id) {
        Playlist found = this.repo.findById(id).orElseThrow(PlaylistNotFoundException::new);
        return this.mapToDTO(found);
    }

    public PlaylistDTO update(PlaylistDTO playlistDTO, Long id) {
        Playlist toUpdate = this.repo.findById(id).orElseThrow(PlaylistNotFoundException::new);
        toUpdate.setName(playlistDTO.getName());
        toUpdate.setDescription(playlistDTO.getDescription());
        toUpdate.setArtwork(playlistDTO.getArtwork());
        toUpdate.setTracks(playlistDTO.getTracks());
        BeanUtils.mergeNotNull(playlistDTO,toUpdate);
        Playlist updated = this.repo.save(toUpdate);
        return this.mapToDTO(updated);
    }

    public boolean delete(Long id) {
        if (!this.repo.existsById(id)) {
            throw new PlaylistNotFoundException();
        }
        this.repo.deleteById(id);
        return !this.repo.existsById(id);
    }

}
