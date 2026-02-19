package ee.robert.veebipood.repository;

import ee.robert.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PersonRepository extends JpaRepository<Person, Long> {
    Person findByEmail(String email);
}
