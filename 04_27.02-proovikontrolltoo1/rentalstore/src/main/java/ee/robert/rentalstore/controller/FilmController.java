package ee.robert.rentalstore.controller;

import ee.robert.rentalstore.dto.FilmSaveDto;
import ee.robert.rentalstore.entity.Film;
import ee.robert.rentalstore.entity.FilmType;
import ee.robert.rentalstore.repository.FilmRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class FilmController {

    private final FilmRepository filmRepository;

    @PostMapping("films")
    public Film saveFilm(@RequestBody FilmSaveDto filmSaveDto){
        Film film = new Film();
        film.setTitle(filmSaveDto.title());
        film.setType(filmSaveDto.type());
        film.setDays(0); // <--- selle nimel tegime Recordi
        return filmRepository.save(film);
    }

    @DeleteMapping("films/{id}")
    public void deleteFilm(@PathVariable Long id){
        filmRepository.deleteById(id);
    }

    // PUT - kogu entity muutmise võimekus
    // PATCH - booking võetud. tellimus makstud. kogus ühe võrra vähendatud.
    @PatchMapping("films/type")
    public Film changeFilmType(@RequestParam Long id, @RequestParam FilmType filmType){
        Film film = filmRepository.findById(id).orElseThrow();
        film.setType(filmType);
        return filmRepository.save(film);
    }

    @GetMapping("films")
    public List<Film> findAll(){
        return filmRepository.findAll();
    }

    @GetMapping("films/available")
    public List<Film> findAllAvailable(){
        return filmRepository.findByDays(0);
    }
}