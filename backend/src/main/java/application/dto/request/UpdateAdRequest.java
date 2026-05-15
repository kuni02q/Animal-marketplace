package application.dto.request;

import application.model.AdStatus;
import application.model.Gender;
import application.model.Location;
import lombok.Data;

import java.time.LocalDate;

@Data
public class UpdateAdRequest {

    private String title;
    private String description;
    private Double price;
    private Location location;

    private Double weight;
    private LocalDate birthDate;

    private Gender gender;

    private Boolean vaccinated;
    private Boolean chipped;
    private Boolean neutered;

    private AdStatus status;

    private Long categoryId;
    private Boolean active;

}
