package ee.robert.decathlon.repository;

import ee.robert.decathlon.entity.Athlete;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AthleteRepository extends JpaRepository<Athlete, Long> {

    Page<Athlete> findAllByCountry(String country, Pageable pageable);

    @Query("SELECT a FROM Athlete a LEFT JOIN a.results r " +
            "WHERE (:country IS NULL OR a.country = :country) " +
            "GROUP BY a.id " +
            "ORDER BY COALESCE(SUM(r.points), 0) DESC")
    Page<Athlete> findAllSortedByScoreDesc(@Param("country") String country, Pageable pageable);

    @Query("SELECT a FROM Athlete a LEFT JOIN a.results r " +
            "WHERE (:country IS NULL OR a.country = :country) " +
            "GROUP BY a.id " +
            "ORDER BY COALESCE(SUM(r.points), 0) ASC")
    Page<Athlete> findAllSortedByScoreAsc(@Param("country") String country, Pageable pageable);

    @Query("SELECT DISTINCT a.country FROM Athlete a " +
            "WHERE a.country IS NOT NULL AND a.country <> '' " +
            "ORDER BY a.country")
    List<String> findDistinctCountries();
}
