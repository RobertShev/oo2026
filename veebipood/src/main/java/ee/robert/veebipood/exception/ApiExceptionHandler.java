package ee.robert.veebipood.exception;

import ee.robert.veebipood.exception.ErrorMessage;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.MissingServletRequestParameterException;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import java.util.Date;

@RestControllerAdvice
public class ApiExceptionHandler {

    @ExceptionHandler
    public ResponseEntity<ee.robert.veebipood.exception.ErrorMessage> handleException(RuntimeException ex) {
        ee.robert.veebipood.exception.ErrorMessage errorMessage = new ee.robert.veebipood.exception.ErrorMessage();
        errorMessage.setMessage(ex.getMessage());
        errorMessage.setStatus(HttpStatus.BAD_REQUEST.value());
        errorMessage.setTimestamp(new Date());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }

    @ExceptionHandler
    public ResponseEntity<ee.robert.veebipood.exception.ErrorMessage> handleException(MissingServletRequestParameterException ex) {
        ee.robert.veebipood.exception.ErrorMessage errorMessage = new ErrorMessage();
        errorMessage.setMessage("Jäi päringus parameeter puudu: " + ex.getMessage());
        errorMessage.setStatus(HttpStatus.BAD_REQUEST.value());
        errorMessage.setTimestamp(new Date());
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorMessage);
    }
}
