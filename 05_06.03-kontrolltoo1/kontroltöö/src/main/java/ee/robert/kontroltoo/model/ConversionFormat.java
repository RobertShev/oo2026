package ee.robert.kontroltoo.model;

public enum ConversionFormat {
    BINARY("2"),
    OCTAL("8"),
    HEX("16");

    private final String value;

    ConversionFormat(String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ConversionFormat fromString(String text) {
        for (ConversionFormat format : ConversionFormat.values()) {
            if (format.value.equalsIgnoreCase(text)) {
                return format;
            }
        }
        throw new IllegalArgumentException("Vigane formaat! Kasuta 2, 8 või 16.");
    }
}
