package ee.robert.decathlon.controller;

import ee.robert.decathlon.dto.AthleteDTO;
import ee.robert.decathlon.service.DecathlonService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/athletes")
@RequiredArgsConstructor
public class AthleteController {

    private final DecathlonService decathlonService;

    @PostMapping
    public List<AthleteDTO> addAthlete(@RequestBody AthleteDTO athleteDTO) {
        decathlonService.addAthlete(athleteDTO);
        return decathlonService.getAllAthletes();
    }

    // localhost:8080/athletes?page=0&size=10&sort=name,asc&country=Estonia&scoreSort=desc
    @GetMapping
    public Page<AthleteDTO> getAthletes(
            Pageable pageable,
            @RequestParam(required = false) String country,
            @RequestParam(required = false) String scoreSort
    ) {
        return decathlonService.getAthletes(pageable, country, scoreSort);
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
    public List<AthleteDTO> deleteAthlete(@PathVariable Long id) {
        decathlonService.deleteAthlete(id);
        return decathlonService.getAllAthletes();
    }
}
