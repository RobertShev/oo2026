package ee.robert.cars.controller;

import ee.robert.cars.dto.CarDTO;
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
    public List<Car> getCars() {
        return carRepository.findAll();
    }

    @DeleteMapping("cars/{id}")
    public List<Car> deleteCar(@PathVariable Long id) {
        carRepository.deleteById(id);
        return carRepository.findAll();
    }

    @PostMapping("cars")
    public Car addCar(@RequestBody CarDTO carDTO) {
        validateCar(carDTO);

        Car car = new Car();
        car.setMake(carDTO.getMake());
        car.setModel(carDTO.getModel());
        car.setTrim(carDTO.getTrim());
        car.setYear(carDTO.getYear());
        car.setColor(carDTO.getColor());
        car.setPower(carDTO.getPower());
        car.setMileage(carDTO.getMileage());
        car.setTransmission(carDTO.getTransmission());
        car.setFuelType(carDTO.getFuelType());

        return carRepository.save(car);
    }

    private void validateCar(CarDTO carDTO) {
        if (carDTO.getMake() == null || carDTO.getMake().isBlank()) {
            throw new IllegalArgumentException("Car make is required.");
        }
        if (carDTO.getModel() == null || carDTO.getModel().isBlank()) {
            throw new IllegalArgumentException("Car model is required.");
        }
        if (carDTO.getYear() == null || carDTO.getYear() < 1886) {
            throw new IllegalArgumentException("Invalid car year. Cars must be from 1886 onwards.");
        }
        if (carDTO.getPower() != null && carDTO.getPower() <= 0) {
            throw new IllegalArgumentException("Car power must be a positive number.");
        }
        if (carDTO.getMileage() != null && carDTO.getMileage() < 0) {
            throw new IllegalArgumentException("Car mileage cannot be negative.");
        }
    }
}