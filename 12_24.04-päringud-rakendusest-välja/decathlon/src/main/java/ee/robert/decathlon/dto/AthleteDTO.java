package ee.robert.decathlon.dto;

import lombok.Data;

@Data
public class AthleteDTO {
    private Long id;
    private String name;
    private String country;
    private Integer totalScore;
}
