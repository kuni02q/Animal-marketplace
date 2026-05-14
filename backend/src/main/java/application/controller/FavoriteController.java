package application.controller;

import application.dto.response.AnimalAdDto;
import application.service.FavoriteService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/favorites")
@RequiredArgsConstructor
public class FavoriteController {

    private final FavoriteService favoriteService;


    @GetMapping("/my")
    public List<AnimalAdDto> getFavorites(@RequestHeader("Authorization") String authHeader) {
        return favoriteService.getFavorites(authHeader);
    }

    @PutMapping("/toggle/{adId}")
    public boolean toggleFavorite(@PathVariable Long adId,
                              @RequestHeader("Authorization") String authHeader) {
        return favoriteService.toggleFavorite(adId, authHeader);

    }

    @GetMapping("/exists/{adId}")
    public boolean isFavorite(@PathVariable Long adId,
                              @RequestHeader("Authorization") String authHeader) {

        return favoriteService.isFavorite(adId, authHeader);
    }

}
