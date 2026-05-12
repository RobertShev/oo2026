package ee.robert.veebipood.controller;

import ee.robert.veebipood.dto.PersonLoginRecordDto;
import ee.robert.veebipood.entity.Person;
import ee.robert.veebipood.repository.PersonRepository;
import ee.robert.veebipood.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*")
@RestController
public class PersonController {

    @Autowired
    private PersonRepository personRepository;

    // Dependency Injection. Kui luuakse see klass (PersonController), seotakse ära samal ajal
    // temaga kõik allolevad muutujad
    // Injectiga võib ka läbi ka constructorite
    @Autowired
    private PersonService personService;

    @GetMapping("persons")
    public List<Person> getPersons(){
        return personRepository.findAll();
    }

    @DeleteMapping("persons/{id}")
    public List<Person> deletePerson(@PathVariable Long id){
        personRepository.deleteById(id); // kustutan
        return personRepository.findAll(); // uuenenud seis
    }

    @PostMapping("signup")
    public Person signup(@RequestBody Person person){ // TODO: PersonSignupDTO (kus pole aadressi ega ID-d)
        // Kui on DTO, siis ei pea alumist kontrolli tegema
        if (person.getId() != null) {
            throw new RuntimeException("Cannot sign up with ID");
        }
        personService.validate(person);
        return personRepository.save(person);
    }

    @PutMapping("profile")
    public Person updateProfile(@RequestBody Person person){ // TODO: PersonUpdateDTO (kus pole parooli)
        if (person.getId() == null) {
            throw new RuntimeException("Cannot update without ID");
        }
        personService.validate(person);
        return personRepository.save(person);
    }

    @GetMapping("profile")
    public Person getProfile(@RequestParam Long id) {
        return personRepository.findById(id).orElseThrow();
    }

    @PostMapping("login")
    public Person login(@RequestBody PersonLoginRecordDto personDto){
        Person dbPerson = personRepository.findByEmail(personDto.email());
        if (dbPerson == null) {
            throw new RuntimeException("Invalid email");
        }
        if (!dbPerson.getPassword().equals(personDto.password())) {
            throw new RuntimeException("Invalid password");
        }
        return dbPerson;
    }
}
