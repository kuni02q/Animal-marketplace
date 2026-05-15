package application.dto.response;

import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
public class AnimalAdDto {

    private Long id;
    private String title;
    private String description;
    private Double price;
    private String city;
    private String country;
    private Integer age;
    private Double weight;
    private Boolean vaccinated;
    private Boolean chipped;
    private Boolean neutered;
    private String gender;
    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private Long categoryId;
    private String categoryName;
    private String username;
    private List<ImageDto> images;

}
