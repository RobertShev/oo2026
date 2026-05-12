package ee.robert.decathlon.controller;

import ee.robert.decathlon.dto.Judge;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpMethod;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;

@RestController
public class JudgeController {

    @Value("${judges.api.url}")
    private String judgesApiUrl;

    private final RestTemplate restTemplate = new RestTemplate();

    @GetMapping("judges")
    public List<Judge> getJudges() {
        Judge[] response = restTemplate.exchange(judgesApiUrl, HttpMethod.GET, null, Judge[].class).getBody();
        return response == null ? List.of() : Arrays.asList(response);
    }
}
