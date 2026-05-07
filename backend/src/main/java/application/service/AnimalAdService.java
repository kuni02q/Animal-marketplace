package application.service;

import application.dto.request.CreateAdRequest;
import application.dto.request.UpdateAdRequest;
import application.dto.response.AnimalAdDto;
import application.mapper.AnimalAdMapper;
import application.model.AnimalAd;
import application.model.Category;
import application.model.User;
import application.repository.AnimalAdRepository;
import application.repository.CategoryRepository;
import application.repository.UserRepository;
import application.security.JwtService;
import lombok.Builder;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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



    public List<AnimalAdDto> getAllAds(){
        return adRepository.findAll().stream().map(mapper::toDto).toList();
    }

    public AnimalAdDto getById(Long id){
        AnimalAd ad = adRepository.findById(id).orElseThrow(()-> new RuntimeException("ad not found"));
        return mapper.toDto(ad);
    }

    public AnimalAdDto createAd(CreateAdRequest request, String authHeader) {

        String token = authHeader.substring(7);

        Long userId = jwtService.extractUserId(token);

        User user = userRepository.findById(userId).orElseThrow(()-> new RuntimeException("user not found"));

        Category category = categoryRepository.findById(request.getCategoryId()).orElseThrow(()-> new RuntimeException("category not found"));

        AnimalAd ad=new AnimalAd();

        ad.setTitle(request.getTitle());
        ad.setDescription(request.getDescription());
        ad.setPrice(request.getPrice());
        ad.setLocation(request.getLocation());
        ad.setCategory(category);
        ad.setUser(user);
        ad.setCreatedAt(LocalDateTime.now());
        ad.setActive(true);

        AnimalAd saved=adRepository.save(ad);



        return mapper.toDto(saved);
    }


    public AnimalAdDto updateAd(Long id, UpdateAdRequest request) {

        AnimalAd ad = adRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Ad not found"));

        ad.setTitle(request.getTitle());
        ad.setDescription(request.getDescription());
        ad.setPrice(request.getPrice());
        ad.setLocation(request.getLocation());
        ad.setActive(request.getActive());

        if (request.getCategoryId() != null) {
            Category category = categoryRepository.findById(request.getCategoryId())
                    .orElseThrow(() -> new RuntimeException("Category not found"));
            ad.setCategory(category);
        }

        return mapper.toDto(adRepository.save(ad));
    }


    public void deleteAd(Long id) {
        adRepository.deleteById(id);
    }



}
