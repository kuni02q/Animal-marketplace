package application.service;

import application.model.AnimalAd;
import application.model.Image;
import application.repository.AnimalAdRepository;
import application.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;
    private final AnimalAdRepository adRepository;

    public void addImage(Long adId, String url) {

        AnimalAd ad = adRepository.findById(adId)
                .orElseThrow(() -> new RuntimeException("Ad not found"));

        Image image = new Image();
        image.setUrl(url);
        image.setAd(ad);

        imageRepository.save(image);
    }

}
