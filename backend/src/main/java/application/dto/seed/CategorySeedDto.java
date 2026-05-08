package application.dto.seed;

import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter @Setter
public class CategorySeedDto {
    private String name;
    private List<String> subcategories;
}
