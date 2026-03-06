package ee.robert.kontroltoo.controller;

import ee.robert.kontroltoo.dto.NumberDto;
import ee.robert.kontroltoo.entity.ConvertedNumberEntity;
import ee.robert.kontroltoo.entity.NumberEntity;
import ee.robert.kontroltoo.model.ConversionFormat;
import ee.robert.kontroltoo.repository.ConvertedNumberRepository;
import ee.robert.kontroltoo.repository.NumberRepository;
import ee.robert.kontroltoo.service.NumberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/numbers")
public class NumberController {

    @Autowired
    private NumberService numberService;

    @Autowired
    private NumberRepository numberRepository;

    @Autowired
    private ConvertedNumberRepository convertedNumberRepository;

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
        List<String> convertedResults = numberService.convertNumbers(numbers, format);
        ConversionFormat conversionFormat = ConversionFormat.fromString(format);

        List<ConvertedNumberEntity> entitiesToSave = new ArrayList<>();

        for (int i = 0; i < numbers.size(); i++) {
            NumberEntity entity = numbers.get(i);
            String convertedValue = convertedResults.get(i);
            entitiesToSave.add(new ConvertedNumberEntity(entity.getValue(), convertedValue, conversionFormat.name()));
        }

        convertedNumberRepository.saveAll(entitiesToSave);

        return convertedResults;
    }
}
