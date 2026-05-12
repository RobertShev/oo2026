package ee.robert.decathlon.service;

import ee.robert.decathlon.dto.AthleteDTO;
import ee.robert.decathlon.dto.ResultDTO;
import ee.robert.decathlon.entity.Athlete;
import ee.robert.decathlon.entity.Result;
import ee.robert.decathlon.exception.ResourceNotFoundException;
import ee.robert.decathlon.repository.AthleteRepository;
import ee.robert.decathlon.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class DecathlonService {

    private final AthleteRepository athleteRepository;
    private final ResultRepository resultRepository;

    public AthleteDTO addAthlete(AthleteDTO athleteDTO) {
        Athlete athlete = new Athlete(athleteDTO.getName(), athleteDTO.getCountry());
        Athlete savedAthlete = athleteRepository.save(athlete);
        return toDTO(savedAthlete);
    }

    @Transactional(readOnly = true)
    public Page<AthleteDTO> getAthletes(Pageable pageable, String country, String scoreSort) {
        String filterCountry = (country == null || country.isBlank()) ? null : country;

        Page<Athlete> athletes;
        if ("desc".equalsIgnoreCase(scoreSort)) {
            athletes = athleteRepository.findAllSortedByScoreDesc(filterCountry, pageable);
        } else if ("asc".equalsIgnoreCase(scoreSort)) {
            athletes = athleteRepository.findAllSortedByScoreAsc(filterCountry, pageable);
        } else if (filterCountry != null) {
            athletes = athleteRepository.findAllByCountry(filterCountry, pageable);
        } else {
            athletes = athleteRepository.findAll(pageable);
        }

        return athletes.map(this::toDTO);
    }

    @Transactional(readOnly = true)
    public List<AthleteDTO> getAllAthletes() {
        return athleteRepository.findAll().stream()
                .map(this::toDTO)
                .toList();
    }

    public List<String> getCountries() {
        return athleteRepository.findDistinctCountries();
    }

    public void deleteAthlete(Long id) {
        if (!athleteRepository.existsById(id)) {
            throw new ResourceNotFoundException("Athlete not found with ID: " + id);
        }
        athleteRepository.deleteById(id);
    }

    public ResultDTO addResult(ResultDTO resultDTO) {
        Athlete athlete = athleteRepository.findById(resultDTO.getAthleteId())
                .orElseThrow(() -> new ResourceNotFoundException("Athlete not found with ID: " + resultDTO.getAthleteId()));

        int points = calculatePoints(resultDTO.getDiscipline(), resultDTO.getResultValue());

        Result result = new Result(resultDTO.getDiscipline(), resultDTO.getResultValue(), points, athlete);
        Result savedResult = resultRepository.save(result);

        resultDTO.setPoints(savedResult.getPoints());
        return resultDTO;
    }

    @Transactional(readOnly = true)
    public Integer getTotalScore(Long athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId)
                .orElseThrow(() -> new ResourceNotFoundException("Athlete not found with ID: " + athleteId));

        return athlete.getResults().stream()
                .mapToInt(Result::getPoints)
                .sum();
    }

    private AthleteDTO toDTO(Athlete athlete) {
        AthleteDTO dto = new AthleteDTO();
        dto.setId(athlete.getId());
        dto.setName(athlete.getName());
        dto.setCountry(athlete.getCountry());
        dto.setTotalScore(athlete.getResults().stream().mapToInt(Result::getPoints).sum());
        return dto;
    }

    private int calculatePoints(String discipline, Double value) {
        if (discipline == null) {
            throw new IllegalArgumentException("Discipline cannot be null");
        }

        String normalizedDiscipline = discipline.toLowerCase().trim();

        switch (normalizedDiscipline) {
            case "100m":
                if (value > 18) return 0;
                return (int) (25.4347 * Math.pow(18 - value, 1.81));
            case "long jump":
                double distanceCm = value * 100;
                if (distanceCm < 220) return 0;
                return (int) (0.14354 * Math.pow(distanceCm - 220, 1.4));
            default:
                throw new IllegalArgumentException("Unsupported discipline: " + discipline + ". Supported: '100m', 'long jump'");
        }
    }
}
