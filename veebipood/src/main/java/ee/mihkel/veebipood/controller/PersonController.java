package ee.mihkel.veebipood.controller;

import ee.mihkel.veebipood.entity.Person;
import ee.mihkel.veebipood.repository.PersonRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    @GetMapping("persons")
    public List<Person> getPersons(){
        return personRepository.findAll();
    }

    @DeleteMapping("persons/{id}")
    public List<Person> deletePerson(@PathVariable Long id){
        personRepository.deleteById(id); // kustutan
        return personRepository.findAll(); // uuenenud seis
    }

    @PostMapping("persons")
    public List<Person> addPerson(@RequestBody Person person){
        personRepository.save(person); // siin salvestab
        return personRepository.findAll(); // siin on uuenenud seis
    }
}
