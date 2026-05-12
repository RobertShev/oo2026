package ee.robert.decathlon.dto;

import lombok.Data;

@Data
public class Location {
    private String id;
    private String createdAt;
    private String country;
    private String city;
    private String county;
    private String street;
}
