package application.dto.request;

import application.model.Gender;
import lombok.Data;

@Data
public class AdFilter {

    private Long categoryId;

    private String city;
    private String country;

    private Double minPrice;
    private Double maxPrice;

    private Gender gender;

    private Boolean vaccinated;
    private Boolean chipped;
    private Boolean neutered;

    private String searchText;
}
