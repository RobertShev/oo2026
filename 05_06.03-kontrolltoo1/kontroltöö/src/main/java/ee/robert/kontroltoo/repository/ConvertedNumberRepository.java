package ee.robert.kontroltoo.repository;

import ee.robert.kontroltoo.entity.ConvertedNumberEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ConvertedNumberRepository extends JpaRepository<ConvertedNumberEntity, Long> {
}
