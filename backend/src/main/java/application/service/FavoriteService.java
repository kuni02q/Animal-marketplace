package application.service;

import application.dto.response.AnimalAdDto;
import application.mapper.AnimalAdMapper;
import application.model.AnimalAd;
import application.model.Favorite;
import application.model.User;
import application.repository.AnimalAdRepository;
import application.repository.FavoriteRepository;
import application.repository.UserRepository;
import application.security.JwtService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final AnimalAdRepository adRepository;
    private final JwtService jwtService;
    private final AnimalAdMapper animalAdMapper;

    public List<AnimalAdDto> getFavorites(String authHeader) {

        Long userId = extractUserId(authHeader);

        return favoriteRepository.findByUserId(userId)
                .stream()
                .map(Favorite::getAd)
                .map(animalAdMapper::toDto)
                .toList();
    }

    @Transactional
    public boolean toggleFavorite(Long adId, String authHeader) {

        Long userId = extractUserId(authHeader);

        boolean exists = favoriteRepository.existsByUserIdAndAdId(userId, adId);

        if (exists) {
            favoriteRepository.deleteByUserIdAndAdId(userId, adId);
            return false;
        }

        User user = userRepository.findById(userId).orElseThrow();
        AnimalAd ad = adRepository.findById(adId).orElseThrow();

        Favorite fav = new Favorite();
        fav.setUser(user);
        fav.setAd(ad);
        fav.setCreatedAt(LocalDateTime.now());

        favoriteRepository.save(fav);

        return true;
    }

    public boolean isFavorite(Long adId, String authHeader) {
        Long userId = extractUserId(authHeader);
        return favoriteRepository.existsByUserIdAndAdId(userId, adId);
    }

    private Long extractUserId(String authHeader) {
        String token = authHeader.substring(7);
        return jwtService.extractUserId(token);
    }


}
