package application.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String url;
    private String fileName;

    private Boolean isPrimary = false;

    private Integer displayOrder;

    @ManyToOne(optional = false)
    @JoinColumn(name="ad_id")
    private AnimalAd ad;
}
