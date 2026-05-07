package application.dto.request;

import lombok.Data;

@Data
public class CreateAdRequest {

    private String title;
    private String description;
    private Double price;
    private String location;
    private String imageUrl;
    private Long categoryId;
    private Long userId;

}
