package application.dto.response;

import lombok.Data;

@Data
public class ImageDto {

    private Long id;
    private String url;
    private Boolean isPrimary;

}
