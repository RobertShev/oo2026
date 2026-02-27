package ee.robert.cars.controller;

import ee.robert.cars.entity.Car;
import ee.robert.cars.repository.CarRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class CarController {
    @Autowired
    private CarRepository carRepository;

    @GetMapping("cars")
    public List<Car> getMovies() {
        return carRepository.findAll();
    }

    @DeleteMapping("cars/{id}")
    public List<Car> deleteMovie(@PathVariable Long id) {
        carRepository.deleteById(id);
        return carRepository.findAll();
    }

    @PostMapping("cars")
    public List<Car> addMovie(@RequestBody Car car) {
        carRepository.save(car);
        return carRepository.findAll();
    }
}