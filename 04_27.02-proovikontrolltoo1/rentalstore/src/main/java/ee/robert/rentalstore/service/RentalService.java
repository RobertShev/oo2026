package ee.robert.rentalstore.service;

import ee.robert.rentalstore.dto.FilmRentalDto;
import ee.robert.rentalstore.entity.Film;
import ee.robert.rentalstore.entity.Rental;
import ee.robert.rentalstore.repository.FilmRepository;
import ee.robert.rentalstore.repository.RentalRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class RentalService {

    private static final double PREMIUM_PRICE = 4;
    private static final double BASIC_PRICE = 3;

    private final RentalRepository rentalRepository;
    private final FilmRepository filmRepository;

    @Transactional
    public Rental startRental(List<FilmRentalDto> filmRentalDtos) {
        Rental rental = new Rental();
        Rental dbRental = rentalRepository.save(rental);

        double sum = 0;
        for (FilmRentalDto filmRentalDto : filmRentalDtos) {
            Film dbFilm = filmRepository.findById(filmRentalDto.filmId()).orElseThrow();
            dbFilm.setRental(dbRental);
            dbFilm.setDays(filmRentalDto.days());
            sum += calculateRentalPrice(dbFilm, filmRentalDto.days());
            filmRepository.save(dbFilm);
        }

        dbRental.setInitialFee(sum);
        return rentalRepository.save(dbRental);
    }

    @Transactional
    public double endRental(List<FilmRentalDto> filmRentalDtos) {
        double sum = 0;
        for (FilmRentalDto filmRentalDto : filmRentalDtos) {
            Film dbFilm = filmRepository.findById(filmRentalDto.filmId()).orElseThrow();
            Rental rental = dbFilm.getRental();

            int extraDays = filmRentalDto.days() - dbFilm.getDays();
            if (extraDays > 0) {
                double lateFeeForFilm = calculateLateFee(dbFilm, extraDays);
                sum += lateFeeForFilm;
                rental.setLateFee(rental.getLateFee() + lateFeeForFilm);
            }

            rentalRepository.save(rental);

            dbFilm.setRental(null);
            dbFilm.setDays(0);
            filmRepository.save(dbFilm);
        }
        return sum;
    }

    private double calculateRentalPrice(Film film, int days) {
        return switch (film.getType()) {
            case NEW -> PREMIUM_PRICE * days;
            case REGULAR -> days <= 3 ? BASIC_PRICE : BASIC_PRICE + BASIC_PRICE * (days - 3);
            case OLD -> days <= 5 ? BASIC_PRICE : BASIC_PRICE + BASIC_PRICE * (days - 5);
        };
    }

    private double calculateLateFee(Film film, int extraDays) {
        return switch (film.getType()) {
            case NEW -> PREMIUM_PRICE * extraDays;
            case REGULAR, OLD -> BASIC_PRICE * extraDays;
        };
    }
}
