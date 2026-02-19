package ee.robert.veebipood.repository;

import ee.robert.veebipood.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CategoryRepository extends JpaRepository<Category, Long> {

}
