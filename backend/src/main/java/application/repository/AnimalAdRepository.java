package application.repository;

import application.model.AnimalAd;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AnimalAdRepository extends JpaRepository<AnimalAd,Long> {
}
