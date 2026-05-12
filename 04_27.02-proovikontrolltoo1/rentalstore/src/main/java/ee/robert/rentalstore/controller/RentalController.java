package ee.robert.rentalstore.controller;

import ee.robert.rentalstore.dto.FilmRentalDto;
import ee.robert.rentalstore.entity.Rental;
import ee.robert.rentalstore.repository.RentalRepository;
import ee.robert.rentalstore.service.RentalService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class RentalController {

    private final RentalRepository rentalRepository;
    private final RentalService rentalService;

    @GetMapping("rentals")
    public List<Rental> findAll() {
        return rentalRepository.findAll();
    }

    @PostMapping("start-rental")
    public Rental startRental(@RequestBody List<FilmRentalDto> filmRentalDtos) {
        return rentalService.startRental(filmRentalDtos);
    }

    @PostMapping("end-rental")
    public double endRental(@RequestBody List<FilmRentalDto> filmRentalDtos) {
        return rentalService.endRental(filmRentalDtos);
    }
}
