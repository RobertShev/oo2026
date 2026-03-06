package ee.robert.kontroltoo.service;

import ee.robert.kontroltoo.dto.NumberDto;
import ee.robert.kontroltoo.entity.NumberEntity;
import ee.robert.kontroltoo.model.ConversionFormat;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class NumberService {

    public void validateNumber(NumberDto numberDto) {
        int value = numberDto.getValue();
        if (value < 0) {
            throw new RuntimeException("Viga: Arv ei tohi olla negatiivne!");
        }
        if (value > 1000000) {
            throw new RuntimeException("Viga: Arv on liiga suur (maksimaalselt 1 000 000)!");
        }
    }

    public List<String> convertNumbers(List<NumberEntity> numbers, String format) {
        ConversionFormat conversionFormat = ConversionFormat.fromString(format);

        return numbers.stream().map(n -> {
            int val = n.getValue();
            return switch (conversionFormat) {
                case BINARY -> Integer.toBinaryString(val);
                case OCTAL -> Integer.toOctalString(val);
                case HEX -> Integer.toHexString(val).toUpperCase();
            };
        }).collect(Collectors.toList());
    }
}
