package ee.robert.decathlon.service;

import ee.robert.decathlon.dto.AthleteDTO;
import ee.robert.decathlon.dto.ResultDTO;
import ee.robert.decathlon.entity.Athlete;
import ee.robert.decathlon.entity.Result;
import ee.robert.decathlon.exception.ResourceNotFoundException;
import ee.robert.decathlon.repository.AthleteRepository;
import ee.robert.decathlon.repository.ResultRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DecathlonService {

    private final AthleteRepository athleteRepository;
    private final ResultRepository resultRepository;

    public AthleteDTO addAthlete(AthleteDTO athleteDTO) {
        Athlete athlete = new Athlete(athleteDTO.getName());
        Athlete savedAthlete = athleteRepository.save(athlete);
        athleteDTO.setId(savedAthlete.getId());
        return athleteDTO;
    }

    public List<AthleteDTO> getAllAthletes() {
        return athleteRepository.findAll().stream()
                .map(a -> {
                    AthleteDTO dto = new AthleteDTO();
                    dto.setId(a.getId());
                    dto.setName(a.getName());
                    return dto;
                })
                .collect(Collectors.toList());
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

    public Integer getTotalScore(Long athleteId) {
        Athlete athlete = athleteRepository.findById(athleteId)
                .orElseThrow(() -> new ResourceNotFoundException("Athlete not found with ID: " + athleteId));

        return athlete.getResults().stream()
                .mapToInt(Result::getPoints)
                .sum();
    }

    private int calculatePoints(String discipline, Double value) {
        if (discipline == null) {
            throw new IllegalArgumentException("Discipline cannot be null");
        }
        
        String normalizedDiscipline = discipline.toLowerCase().trim();
        
        switch (normalizedDiscipline) {
            case "100m":
                // 100 metres: 25.4347 * (18 - T)^1.81
                if (value > 18) return 0;
                return (int) (25.4347 * Math.pow(18 - value, 1.81));
            case "long jump":
                // Long jump: 0.14354 * (D - 220)^1.4
                // value is usually in meters, formula expects centimeters
                double distanceCm = value * 100;
                if (distanceCm < 220) return 0;
                return (int) (0.14354 * Math.pow(distanceCm - 220, 1.4));
            default:
                throw new IllegalArgumentException("Unsupported discipline: " + discipline + ". Supported: '100m', 'long jump'");
        }
    }
}
