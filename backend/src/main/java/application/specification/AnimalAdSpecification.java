package application.specification;

import application.model.AnimalAd;
import application.model.Gender;
import org.springframework.data.jpa.domain.Specification;

public class AnimalAdSpecification {

    public static Specification<AnimalAd> hasCity(String city) {
        return (root, query, cb) ->
                city == null ? null : cb.equal(root.get("location").get("city"), city);
    }

    public static Specification<AnimalAd> hasCountry(String country) {
        return (root, query, cb) ->
                country == null ? null : cb.equal(root.get("location").get("country"), country);
    }

    public static Specification<AnimalAd> hasCategory(Long categoryId) {
        return (root, query, cb) ->
                categoryId == null ? null : cb.equal(root.get("category").get("id"), categoryId);
    }

    public static Specification<AnimalAd> minPrice(Double minPrice) {
        return (root, query, cb) ->
                minPrice == null ? null : cb.ge(root.get("price"), minPrice);
    }

    public static Specification<AnimalAd> maxPrice(Double maxPrice) {
        return (root, query, cb) ->
                maxPrice == null ? null : cb.le(root.get("price"), maxPrice);
    }

    public static Specification<AnimalAd> hasGender(String gender) {
        return (root, query, cb) ->
                gender == null ? null : cb.equal(root.get("gender"), Gender.valueOf(gender));
    }

    public static Specification<AnimalAd> vaccinated(Boolean v) {
        return (root, query, cb) ->
                v == null ? null : cb.equal(root.get("vaccinated"), v);
    }

    public static Specification<AnimalAd> chipped(Boolean c) {
        return (root, query, cb) ->
                c == null ? null : cb.equal(root.get("chipped"), c);
    }

    public static Specification<AnimalAd> neutered(Boolean n) {
        return (root, query, cb) ->
                n == null ? null : cb.equal(root.get("neutered"), n);
    }


    public static Specification<AnimalAd> searchText(String text) {
        return (root, query, cb) -> {
            if (text == null || text.isBlank()) {
                return null;
            }

            String like = "%" + text.toLowerCase() + "%";

            return cb.or(
                    cb.like(cb.lower(root.get("title")), like),
                    cb.like(cb.lower(root.get("description")), like)
            );
        };
    }


}