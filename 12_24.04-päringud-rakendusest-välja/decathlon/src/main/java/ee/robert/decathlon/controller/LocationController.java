package ee.robert.decathlon.controller;

import ee.robert.decathlon.dto.Location;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
public class LocationController {

    @Value("${locations.api.url}")
    private String locationsApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("locations")
    public List<Location> getLocations() {
        Location[] response = restTemplate.exchange(locationsApiUrl, HttpMethod.GET, null, Location[].class).getBody();
        return response == null ? List.of() : Arrays.asList(response);
    }
}
