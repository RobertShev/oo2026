package ee.robert.decathlon.controller;

import ee.robert.decathlon.dto.ResultDTO;
import ee.robert.decathlon.service.DecathlonService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/results")
@RequiredArgsConstructor
public class ResultController {

    private final DecathlonService decathlonService;

    @PostMapping
    public ResultDTO addResult(@RequestBody ResultDTO resultDTO) {
        return decathlonService.addResult(resultDTO);
    }
}
