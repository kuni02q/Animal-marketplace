package application.mapper;

import application.dto.response.CategoryDto;
import application.model.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryDto toDto(Category category){

        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());

        dto.setSubcategories(
                category.getSubcategories().stream().map(this::toDto).toList()
        );

        return dto;

    }
}
