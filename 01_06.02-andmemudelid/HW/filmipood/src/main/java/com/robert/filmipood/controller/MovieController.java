package com.robert.filmipood.controller;

import com.robert.filmipood.entity.Movie;
import com.robert.filmipood.repository.MovieRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class MovieController {
    @Autowired
    private MovieRepository movieRepository;

    @GetMapping("movies")
    public List<Movie> getMovies() {
        return movieRepository.findAll();
    }

    @DeleteMapping("movies/{id}")
    public List<Movie> deleteMovie(@PathVariable Long id) {
        movieRepository.deleteById(id);
        return movieRepository.findAll();
    }

    @PostMapping("movies")
    public List<Movie> addMovie(@RequestBody Movie movie) {
        movieRepository.save(movie);
        return movieRepository.findAll();
    }
}
