package application.service;

import application.model.AnimalAd;
import application.model.Image;
import application.repository.AnimalAdRepository;
import application.repository.ImageRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.imageio.ImageIO;
import java.awt.image.BufferedImage;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    @Value("${file.upload-dir}")
    private String uploadDir;

    public void saveImages(AnimalAd ad, MultipartFile[] files) {

        if (files == null || files.length == 0) {
            return;
        }

        try {

            Path uploadPath = Paths.get(uploadDir);

            if (!Files.exists(uploadPath)) {
                Files.createDirectories(uploadPath);
            }

            for (MultipartFile file : files) {

                if (file.isEmpty()) {
                    continue;
                }

                try{
                    BufferedImage imageCheck = ImageIO.read(file.getInputStream());

                    if (imageCheck == null) {
                        throw new RuntimeException("Invalid image file");
                    }

                }catch (IOException e){
                    throw new RuntimeException("Invalid image file");
                }

                String fileName =
                        UUID.randomUUID() + "_" + file.getOriginalFilename();

                Path filePath = uploadPath.resolve(fileName);

                Files.copy(file.getInputStream(), filePath,
                        StandardCopyOption.REPLACE_EXISTING);

                Image image = new Image();
                image.setUrl("/uploads/" + fileName);
                image.setFileName(fileName);
                image.setIsPrimary(ad.getImages().isEmpty());
                image.setAd(ad);

                imageRepository.save(image);

                ad.getImages().add(image);
            }

        } catch (IOException e) {
            throw new RuntimeException("Failed to upload image");
        }
    }

    public void deleteImage(Image image) {

        try {

            Path filePath = Paths.get(uploadDir).resolve(image.getFileName());

            Files.deleteIfExists(filePath);

            imageRepository.delete(image);

        } catch (IOException e) {
            throw new RuntimeException("Failed to delete image");
        }
    }

}
