package application.dto.response;

import lombok.Data;

import java.util.List;

@Data
public class AnimalAdDto {

    private Long id;
    private String title;
    private String description;
    private Double price;
    private String location;

    private String categoryName;
    private String username;
    private List<ImageDto> images;

}
