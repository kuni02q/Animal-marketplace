package application.controller;

import application.dto.request.CreateAdRequest;
import application.dto.request.UpdateAdRequest;
import application.dto.response.AnimalAdDto;
import application.model.AnimalAd;
import application.service.AnimalAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AnimalAdController {

    private  final AnimalAdService service;

    @GetMapping
    public List<AnimalAdDto> getAll() {
        return service.getAllAds();
    }

    @GetMapping("/{id}")
    public AnimalAdDto getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PostMapping
    public AnimalAdDto create(@RequestBody CreateAdRequest request) {
        Long fakeUserId = 1L; //only now------------------------------------------
        return service.createAd(request, fakeUserId);
    }

    @PutMapping("/{id}")
    public AnimalAdDto update(@PathVariable Long id ,@RequestBody UpdateAdRequest request) {
        return service.updateAd(id,request);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id) {
        service.deleteAd(id);
    }
}
