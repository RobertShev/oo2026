package ee.robert.decathlon.controller;

import ee.robert.decathlon.dto.AthleteDTO;
import ee.robert.decathlon.service.DecathlonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/athletes")
@RequiredArgsConstructor
public class AthleteController {

    private final DecathlonService decathlonService;

    @PostMapping
    public AthleteDTO addAthlete(@RequestBody AthleteDTO athleteDTO) {
        return decathlonService.addAthlete(athleteDTO);
    }

    @GetMapping
    public List<AthleteDTO> getAllAthletes() {
        return decathlonService.getAllAthletes();
    }

    @GetMapping("/{id}/total-score")
    public Integer getTotalScore(@PathVariable Long id) {
        return decathlonService.getTotalScore(id);
    }
}
