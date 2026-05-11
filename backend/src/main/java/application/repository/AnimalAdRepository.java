package application.repository;

import application.model.AnimalAd;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AnimalAdRepository extends JpaRepository<AnimalAd,Long> {
    List<AnimalAd> findByUserId(Long userId);
}
