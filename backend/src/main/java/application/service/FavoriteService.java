package application.service;

import application.model.AnimalAd;
import application.model.Favorite;
import application.model.User;
import application.repository.AnimalAdRepository;
import application.repository.FavoriteRepository;
import application.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class FavoriteService {

    private final FavoriteRepository favoriteRepository;
    private final UserRepository userRepository;
    private final AnimalAdRepository adRepository;

    public void addFavorite(Long userId, Long adId) {

        User user = userRepository.findById(userId)
                .orElseThrow();

        AnimalAd ad = adRepository.findById(adId)
                .orElseThrow();

        Favorite fav = new Favorite();
        fav.setUser(user);
        fav.setAd(ad);
        fav.setCreatedAt(LocalDateTime.now());

        favoriteRepository.save(fav);
    }
}
