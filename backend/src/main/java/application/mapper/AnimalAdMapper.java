package application.mapper;

import application.dto.response.AnimalAdDto;
import application.dto.response.ImageDto;
import application.model.AnimalAd;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;

import java.time.LocalDate;
import java.time.Period;
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
        if (ad.getLocation() != null) {
            dto.setCity(ad.getLocation().getCity());
            dto.setCountry(ad.getLocation().getCountry());
        } else{
            dto.setCity(null);
            dto.setCountry(null);
        }
        dto.setCreatedAt(ad.getCreatedAt());
        dto.setUpdatedAt(ad.getUpdatedAt());
        dto.setWeight(ad.getWeight());

        dto.setVaccinated(ad.getVaccinated());
        dto.setChipped(ad.getChipped());
        dto.setNeutered(ad.getNeutered());

        dto.setGender(ad.getGender() != null ? ad.getGender().name() : null);
        dto.setStatus(ad.getStatus() != null ? ad.getStatus().name() : null);
        dto.setBirthDate(ad.getBirthDate());

        if (ad.getBirthDate() != null) {
            dto.setAge(Period.between(ad.getBirthDate(), LocalDate.now()).getYears());
        }

        dto.setViewCount(ad.getViewCount());

        dto.setCategoryId(ad.getCategory() != null ? ad.getCategory().getId() : null);
        dto.setCategoryName(ad.getCategory() != null ? ad.getCategory().getName() : null);
        dto.setUsername(ad.getUser() != null ? ad.getUser().getUsername() : null);

        List<ImageDto> images = ad.getImages()
                .stream()
                .map(imageMapper::toDto)
                .toList();

        dto.setImages(images);

        return dto;

    }


}
