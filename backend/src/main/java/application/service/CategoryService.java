package application.service;

import application.dto.response.CategoryDto;
import application.mapper.CategoryMapper;
import application.model.Category;
import application.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    public List<CategoryDto> getAll() {
        return categoryRepository.findAll()
                .stream()
                .filter(category -> category.getParent() == null)
                .map(categoryMapper::toDto)
                .toList();

    }

    public CategoryDto getById(Long id){

        Category category = categoryRepository.findById(id)
                .orElseThrow(()-> new RuntimeException("Category not found"));

        return categoryMapper.toDto(category);
    }


}
