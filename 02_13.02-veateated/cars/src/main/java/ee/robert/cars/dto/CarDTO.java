package ee.robert.cars.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class CarDTO {
    private String make;
    private String model;
    private String trim;
    private Integer year;
    private String color;
    private Integer power;
    private Integer mileage;
    private String transmission;
    private String fuelType;
}
