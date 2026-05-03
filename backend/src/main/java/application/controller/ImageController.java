package application.controller;

import application.service.ImageService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/images")
@RequiredArgsConstructor
public class ImageController {

    private final ImageService imageService;

    @PostMapping("/{adId}")
    public void addImage(@PathVariable Long adId, @RequestParam String url) {
        imageService.addImage(adId, url);
    }
}
