package application.repository;

import application.model.AnimalAd;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;

import java.util.List;

public interface AnimalAdRepository extends JpaRepository<AnimalAd,Long>, JpaSpecificationExecutor<AnimalAd> {
    List<AnimalAd> findByUserId(Long userId);
}
