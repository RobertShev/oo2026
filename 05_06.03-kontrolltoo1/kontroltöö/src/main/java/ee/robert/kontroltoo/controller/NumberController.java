package ee.robert.kontroltoo.controller;

import ee.robert.kontroltoo.entity.NumberEntity;
import ee.robert.kontroltoo.repository.NumberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/numbers")
public class NumberController {

    @Autowired
    private NumberRepository numberRepository;

    @GetMapping
    public List<NumberEntity> getAllNumbers() {
        return numberRepository.findAll();
    }

    @PostMapping("/{value}")
    public String addNumber(@PathVariable int value) {
        if (value < 0) {
            throw new RuntimeException("Viga: Arv ei tohi olla negatiivne!");
        }
        if (value > 1000000) {
            throw new RuntimeException("Viga: Arv on liiga suur (maksimaalselt 1 000 000)!");
        }
        
        numberRepository.save(new NumberEntity(value));
        return "Arv " + value + " on lisatud andmebaasi.";
    }
}
