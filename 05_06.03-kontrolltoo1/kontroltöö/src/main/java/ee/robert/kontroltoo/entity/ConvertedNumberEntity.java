package ee.robert.kontroltoo.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ConvertedNumberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private int originalValue;
    private String convertedValue;
    private String format;

    public ConvertedNumberEntity(int originalValue, String convertedValue, String format) {
        this.originalValue = originalValue;
        this.convertedValue = convertedValue;
        this.format = format;
    }
}
