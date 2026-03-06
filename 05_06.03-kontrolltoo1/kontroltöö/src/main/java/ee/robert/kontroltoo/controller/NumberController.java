package ee.robert.kontroltoo.controller;

import ee.robert.kontroltoo.dto.NumberDto;
import ee.robert.kontroltoo.entity.NumberEntity;
import ee.robert.kontroltoo.repository.NumberRepository;
import ee.robert.kontroltoo.service.NumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/numbers")
public class NumberController {

    @Autowired
    private NumberService numberService;

    @Autowired
    private NumberRepository numberRepository;

    @GetMapping
    public List<NumberEntity> getAllNumbers() {
        return numberRepository.findAll();
    }

    @PostMapping
    public NumberEntity addNumber(@RequestBody NumberDto numberDto) {
        numberService.validateNumber(numberDto);
        NumberEntity savedEntity = numberRepository.save(new NumberEntity(numberDto.getValue()));
        return savedEntity;
    }

    @GetMapping("/convert")
    public List<String> convertNumbers(@RequestParam String format) {
        List<NumberEntity> numbers = numberRepository.findAll();
        return numberService.convertNumbers(numbers, format);
    }
}
