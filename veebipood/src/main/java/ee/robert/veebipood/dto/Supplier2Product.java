package ee.robert.veebipood.dto;

import lombok.Getter;
import lombok.Setter;

import java.util.ArrayList;
import java.util.Date;

@Getter
@Setter
public class Supplier2Product {
    private int id;
    private String title;
    private String slug;
    private int price;
    private String description;
    private Supplier2Category category;
    private ArrayList<String> images;
    private Date creationAt;
    private Date updatedAt;
}
