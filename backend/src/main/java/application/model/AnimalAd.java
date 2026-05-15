package application.model;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter @Setter
@NoArgsConstructor
public class AnimalAd {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String title;

    @Column(length = 2000)
    private String description;

    private Double price;

    @Embedded
    private Location location;

    private LocalDate birthDate;

    private Double weight;

    @Enumerated(EnumType.STRING)
    private Gender gender;

    private Boolean vaccinated = false;
    private Boolean chipped = false;
    private Boolean neutered = false;

    @Enumerated(EnumType.STRING)
    private AdStatus status = AdStatus.ACTIVE;

    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    private Integer viewCount = 0;

    @ManyToOne
    @JoinColumn(name="user_id")
    private User user;

    @OneToMany(mappedBy = "ad", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<Image> images = new ArrayList<>();

    @ManyToOne
    @JoinColumn(name="category_id")
    private Category category;

    @OneToMany(mappedBy = "ad", cascade = CascadeType.ALL)
    private List<Favorite>  favorites = new ArrayList<>();

}
