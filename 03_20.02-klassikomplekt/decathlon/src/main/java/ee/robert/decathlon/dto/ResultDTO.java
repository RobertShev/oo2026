package ee.robert.decathlon.dto;

import lombok.Data;

@Data
public class ResultDTO {
    private Long athleteId;
    private String discipline;
    private Double resultValue;
    private Integer points;
}
