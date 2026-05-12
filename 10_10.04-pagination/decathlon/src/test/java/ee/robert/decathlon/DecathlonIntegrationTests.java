package ee.robert.decathlon;

import ee.robert.decathlon.dto.AthleteDTO;
import ee.robert.decathlon.dto.ResultDTO;
import ee.robert.decathlon.service.DecathlonService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
public class DecathlonIntegrationTests {

    @Autowired
    private DecathlonService decathlonService;

    @Test
    public void testDecathlonFlow() {
        // 1. Lisa uus sportlane
        AthleteDTO athlete = new AthleteDTO();
        athlete.setName("Erki Nool");
        AthleteDTO savedAthlete = decathlonService.addAthlete(athlete);
        
        Long athleteId = savedAthlete.getId();
        assertThat(athleteId).isNotNull();

        // 2. Lisa tulemus: 100m
        ResultDTO result100m = new ResultDTO();
        result100m.setAthleteId(athleteId);
        result100m.setDiscipline("100m");
        result100m.setResultValue(10.34);
        
        ResultDTO saved100m = decathlonService.addResult(result100m);
        Integer points100m = saved100m.getPoints();
        assertThat(points100m).isGreaterThan(0);

        // 3. Lisa tulemus: kaugushüpe
        ResultDTO resultLJ = new ResultDTO();
        resultLJ.setAthleteId(athleteId);
        resultLJ.setDiscipline("long jump");
        resultLJ.setResultValue(8.0);
        
        ResultDTO savedLJ = decathlonService.addResult(resultLJ);
        Integer pointsLJ = savedLJ.getPoints();
        assertThat(pointsLJ).isGreaterThan(0);

        // 4. Kontrolli kogusummat
        Integer totalScore = decathlonService.getTotalScore(athleteId);
        assertThat(totalScore).isEqualTo(points100m + pointsLJ);
    }

    @Test
    public void testErrorMessages() {
        // Kontrolli olematut sportlast
        ResultDTO result = new ResultDTO();
        result.setAthleteId(999L);
        result.setDiscipline("100m");
        result.setResultValue(12.0);
        
        assertThrows(RuntimeException.class, () -> decathlonService.addResult(result));

        // Kontrolli vigast ala
        AthleteDTO athlete = new AthleteDTO();
        athlete.setName("Test Sportlane");
        AthleteDTO savedAthlete = decathlonService.addAthlete(athlete);

        ResultDTO badResult = new ResultDTO();
        badResult.setAthleteId(savedAthlete.getId());
        badResult.setDiscipline("marathon");
        badResult.setResultValue(2.0);
        
        assertThrows(IllegalArgumentException.class, () -> decathlonService.addResult(badResult));
    }
}
