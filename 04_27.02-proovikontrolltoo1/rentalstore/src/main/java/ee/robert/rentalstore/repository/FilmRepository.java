package ee.robert.rentalstore.repository;

import ee.robert.rentalstore.entity.Film;
import lombok.NonNull;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface FilmRepository extends JpaRepository<@NonNull Film,@NonNull Long> {

    List<Film> findByDays(Integer days);
}