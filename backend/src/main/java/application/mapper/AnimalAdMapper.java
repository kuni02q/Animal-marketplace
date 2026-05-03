package application.mapper;

import application.dto.response.AnimalAdDto;
import application.dto.response.ImageDto;
import application.model.AnimalAd;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
@RequiredArgsConstructor
public class AnimalAdMapper {

    private final ImageMapper imageMapper;

    public AnimalAdDto toDto(AnimalAd ad) {
        AnimalAdDto dto = new AnimalAdDto();

        dto.setId(ad.getId());
        dto.setTitle(ad.getTitle());
        dto.setDescription(ad.getDescription());
        dto.setPrice(ad.getPrice());
        dto.setLocation(ad.getLocation());

        dto.setCategoryName(ad.getCategory().getName());
        dto.setUsername(ad.getUser().getUsername());

        List<ImageDto> images = ad.getImages()
                .stream()
                .map(imageMapper::toDto)
                .toList();

        dto.setImages(images);

        return dto;

    }


}
