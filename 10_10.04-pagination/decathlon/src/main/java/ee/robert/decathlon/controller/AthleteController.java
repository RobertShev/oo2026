package ee.robert.decathlon.controller;

import ee.robert.decathlon.dto.AthleteDTO;
import ee.robert.decathlon.service.DecathlonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
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
    public Page<AthleteDTO> getAthletes(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String scoreSort
    ) {
        return decathlonService.getAthletes(page, size, country, scoreSort);
    }

    @GetMapping("/countries")
    public List<String> getCountries() {
        return decathlonService.getCountries();
    }

    @GetMapping("/{id}/total-score")
    public Integer getTotalScore(@PathVariable Long id) {
        return decathlonService.getTotalScore(id);
    }

    @DeleteMapping("/{id}")
    public void deleteAthlete(@PathVariable Long id) {
        decathlonService.deleteAthlete(id);
    }
}
