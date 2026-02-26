package ee.mihkel.veebipood.dto;

public record OrderRowDto( // DTO --> Data Transfer Object
        Long productId,
        int quantity
) {
}
