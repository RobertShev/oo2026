package ee.robert.rentalstore.dto;

import ee.robert.rentalstore.entity.FilmType;

public record FilmSaveDto(String title,
                          FilmType type
) {
}
