package application.service;

import application.dto.request.CreateAdRequest;
import application.dto.request.UpdateAdRequest;
import application.dto.response.AnimalAdDto;
import application.mapper.AnimalAdMapper;
import application.model.*;
import application.repository.AnimalAdRepository;
import application.repository.CategoryRepository;
import application.repository.ImageRepository;
import application.repository.UserRepository;
import application.security.JwtService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class AnimalAdService {

    private final AnimalAdRepository adRepository;
    private final CategoryRepository categoryRepository;
    private final UserRepository userRepository;
    private final AnimalAdMapper mapper;
    private final JwtService jwtService;
    private final ImageService imageService;
    private final ImageRepository imageRepository;



    public List<AnimalAdDto> getAllAds(){
        return adRepository.findAll().stream().map(mapper::toDto).toList();
    }

    @Transactional
    public AnimalAdDto getById(Long id){
        AnimalAd ad = adRepository.findById(id).orElseThrow(()-> new RuntimeException("ad not found"));
        ad.setViewCount(ad.getViewCount() == null ? 1 : ad.getViewCount()+1);
        return mapper.toDto(ad);
    }

    public List<AnimalAdDto> getMyAds(String authHeader){

        String token = authHeader.substring(7);
        Long userId = jwtService.extractUserId(token);

        return adRepository.findByUserId(userId).stream().map(mapper::toDto).toList();

    }


    public AnimalAdDto createAd(CreateAdRequest request, MultipartFile[] images, String authHeader) {

        String token = authHeader.substring(7);

        Long userId = jwtService.extractUserId(token);

        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("user not found"));

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(()-> new RuntimeException("category not found"));

        AnimalAd ad=new AnimalAd();

        ad.setTitle(request.getTitle());
        ad.setDescription(request.getDescription());
        ad.setPrice(request.getPrice());

        if (request.getLocation() != null) {
            Location loc = new Location();
            loc.setCity(request.getLocation().getCity());
            loc.setCountry(request.getLocation().getCountry());
            ad.setLocation(loc);
        }


        ad.setCategory(category);
        ad.setUser(user);
        ad.setCreatedAt(LocalDateTime.now());
        ad.setUpdatedAt(LocalDateTime.now());

        ad.setWeight(request.getWeight());
        ad.setBirthDate(request.getBirthDate());

        ad.setGender(request.getGender());

        ad.setVaccinated(request.getVaccinated());
        ad.setChipped(request.getChipped());
        ad.setNeutered(request.getNeutered());

        ad.setStatus(request.getStatus() != null ? request.getStatus() : AdStatus.ACTIVE);

        AnimalAd saved=adRepository.save(ad);

        imageService.saveImages(saved, images);


        return mapper.toDto(saved);
    }


    public AnimalAdDto updateAd(Long id, UpdateAdRequest request, MultipartFile[] images, List<String> deleteImageIds, String authHeader) {

        String token = authHeader.substring(7);

        Long userId = jwtService.extractUserId(token);

        AnimalAd ad = adRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found"));

        if (!ad.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not your ad");
        }


        ad.setTitle(request.getTitle());
        ad.setDescription(request.getDescription());
        ad.setPrice(request.getPrice());
        if (request.getLocation() != null) {

            Location loc = ad.getLocation();

            if (loc == null) {
                loc = new Location();
                ad.setLocation(loc);
            }

            loc.setCity(request.getLocation().getCity());
            loc.setCountry(request.getLocation().getCountry());
        }
        ad.setUpdatedAt(LocalDateTime.now());

        ad.setWeight(request.getWeight());
        ad.setBirthDate(request.getBirthDate());

        ad.setGender(request.getGender());

        ad.setVaccinated(request.getVaccinated());
        ad.setChipped(request.getChipped());
        ad.setNeutered(request.getNeutered());

        if (request.getStatus() != null) {
            ad.setStatus(request.getStatus());
        }

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            ad.setCategory(category);
        }

        if(deleteImageIds != null){

            for (String imageIdStr: deleteImageIds) {

                Long imageId = Long.valueOf(imageIdStr);
                Image image = imageRepository.findById(imageId).orElseThrow(() -> new RuntimeException("image not found"));

                ad.getImages().remove(image);
                imageService.deleteImage(image);

            }

        }

        imageService.saveImages(ad, images);

        return mapper.toDto(adRepository.save(ad));
    }


    public void deleteAd(Long id, String authHeader) {

        String token = authHeader.substring(7);

        Long userId = jwtService.extractUserId(token);

        AnimalAd ad = adRepository.findById(id).orElseThrow(() -> new RuntimeException("ad not found"));

        if (!ad.getUser().getId().equals(userId)) {
            throw new RuntimeException("Not your ad");
        }


        for(Image image : ad.getImages()){
            imageService.deleteImage(image);
        }


        adRepository.deleteById(id);
    }

    public void incrementViewCount(Long id) {
        AnimalAd ad = adRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("ad not found"));

        ad.setViewCount(ad.getViewCount() + 1);
        adRepository.save(ad);
    }



}
