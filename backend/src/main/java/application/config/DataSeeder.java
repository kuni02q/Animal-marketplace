package application.config;

import application.dto.seed.CategorySeedDto;
import application.model.Category;
import application.repository.CategoryRepository;
import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;

import java.io.InputStream;
import java.util.List;

@Configuration
@RequiredArgsConstructor
public class DataSeeder {

    private final CategoryRepository categoryRepository;

    @Bean
    CommandLineRunner seedCategories(){
        return args -> {

            System.out.println("SEEDER STARTED");

            if(categoryRepository.count()>0){
                System.out.println("Categories already exist");
                return;
            }

            ObjectMapper mapper = new ObjectMapper();

            InputStream inputStream = new ClassPathResource("categories.json").getInputStream();

            List<CategorySeedDto> categories = mapper.readValue(inputStream, new TypeReference<List<CategorySeedDto>>() {});

            for(CategorySeedDto categoryDto : categories){
                Category parent = new Category();
                parent.setName(categoryDto.getName());
                categoryRepository.save(parent);

                for (String subcategoryName: categoryDto.getSubcategories()){
                    Category subcategory = new Category();
                    subcategory.setName(subcategoryName);
                    subcategory.setParent(parent);
                    categoryRepository.save(subcategory);
                }

            }

            System.out.println("categories loaded successfully");

        };
    }


}
