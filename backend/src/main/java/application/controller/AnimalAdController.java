package application.controller;

import application.dto.request.AdFilter;
import application.dto.request.CreateAdRequest;
import application.dto.request.UpdateAdRequest;
import application.dto.response.AnimalAdDto;
import application.dto.response.PageResponse;
import application.model.AnimalAd;
import application.service.AnimalAdService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/ads")
@RequiredArgsConstructor
public class AnimalAdController {

    private  final AnimalAdService service;

    @GetMapping
    public PageResponse<AnimalAdDto> getAll(@ModelAttribute AdFilter filter,
                                            @PageableDefault(sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        Page<AnimalAdDto> page = service.getAllAds(filter, pageable);

        return new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isFirst(),
                page.isLast()
        );
    }

    @GetMapping("/{id}")
    public AnimalAdDto getById(@PathVariable Long id) {

        return service.getById(id);
    }

    @GetMapping("/my")
    public List<AnimalAdDto> getMyAds(@RequestHeader("Authorization") String authHeader) {
        return service.getMyAds(authHeader);
    }




    @PostMapping(consumes = {"multipart/form-data"})
    public AnimalAdDto create(@ModelAttribute CreateAdRequest request,
                              @RequestParam(required = false) MultipartFile[] images,
                              @RequestHeader("Authorization") String authHeader) {
        return service.createAd(request, images, authHeader);
    }

    @PutMapping(value= "/{id}", consumes = {"multipart/form-data"})
    public AnimalAdDto update(@PathVariable Long id,
                              @ModelAttribute UpdateAdRequest request,
                              @RequestParam(required = false) MultipartFile[] images,
                              @RequestParam(required = false) List<String> deleteImageIds,
                              @RequestHeader("Authorization") String authHeader) {
        return service.updateAd(id,request, images, deleteImageIds,  authHeader);
    }

    @DeleteMapping("/{id}")
    public void delete(@PathVariable Long id,
                       @RequestHeader("Authorization") String authHeader) {
        service.deleteAd(id, authHeader);
    }
}
