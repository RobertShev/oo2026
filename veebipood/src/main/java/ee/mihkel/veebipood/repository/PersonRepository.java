package ee.mihkel.veebipood.repository;

import ee.mihkel.veebipood.entity.Person;
import org.springframework.data.jpa.repository.JpaRepository;

// CrudRepository --> minimaalsed vajalikud (standardsed) funktsioonid
// PagingAndSortingRepository --> funktsioonid lehekülgede andmete väljastamiseks ja sorteerimiseks
// JpaRepository --> kõikvõimalikud funktsioonid

public interface PersonRepository extends JpaRepository<Person,Long> {
}
