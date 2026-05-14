package application.repository;

import application.model.AnimalAd;
import application.model.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface FavoriteRepository extends JpaRepository<Favorite,Long> {

    List<Favorite> findByUserId(Long userId);

    Optional<Favorite> findByUserIdAndAdId(Long userId, Long adId);

    void deleteByUserIdAndAdId(Long userId, Long adId);

    boolean existsByUserIdAndAdId(Long userId, Long adId);

}
