package ee.robert.veebipood.dto;

import lombok.Data;

@Data
public class PersonLoginDto {
    private String email;
    private String password;
}