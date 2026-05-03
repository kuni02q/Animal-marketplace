package application.mapper;

import application.dto.response.ImageDto;
import application.model.Image;
import org.springframework.stereotype.Component;

@Component
public class ImageMapper {

    public ImageDto toDto(Image image) {
        ImageDto dto = new ImageDto();
        dto.setUrl(image.getUrl());
        dto.setIsPrimary(image.getIsPrimary());
        return dto;
    }
}
