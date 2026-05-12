package ee.robert.decathlon.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
public class Result {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String discipline; // e.g., "100m", "long jump"
    private Double resultValue;
    private Integer points;

    @ManyToOne
    @JoinColumn(name = "athlete_id")
    private Athlete athlete;

    public Result(String discipline, Double resultValue, Integer points, Athlete athlete) {
        this.discipline = discipline;
        this.resultValue = resultValue;
        this.points = points;
        this.athlete = athlete;
    }
}
