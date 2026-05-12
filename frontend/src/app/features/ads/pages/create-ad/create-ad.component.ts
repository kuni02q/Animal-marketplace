import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ApiService} from '../../../../core/services/api.service';
import {AdsService} from '../../services/ads.service';
import {CategoryService} from '../../../../core/services/category.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-create-ad',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './create-ad.component.html',
  styleUrl: './create-ad.component.css',
})
export class CreateAdComponent implements OnInit {

  title = "";
  description = "";
  price: number | null = null;
  location = "";
  categoryId: number | null = null;

  categories: any[] = [];

  selectedImages:{
    file: File;
    preview: string;
  }[] = [];

  loading = false;

  @ViewChild('fileInput')
  fileInput!: ElementRef<HTMLInputElement>;

  constructor(private adsService: AdsService, private categoryService: CategoryService, private router: Router, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.loadCategories();
  }

  loadCategories() {
    this.categoryService.getAll().subscribe({
      next: (data) =>{
        console.log(data);
        this.categories = data;

        this.cdr.markForCheck();
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  onDragOver(event: DragEvent){
    event.preventDefault();
  }

  onDrop(event: DragEvent){
    event.preventDefault();

    if(event.dataTransfer?.files){
      for (const file of Array.from(event.dataTransfer.files)) {

        this.selectedImages.push({
          file,
          preview: URL.createObjectURL(file),
        });

      }
    }

  }

  onFileSelected(event: Event){

    const input = event.target as HTMLInputElement;

    if (!input.files) return;

    for (const file of Array.from(input.files)) {

      this.selectedImages.push({
        file,
        preview: URL.createObjectURL(file),
      });

    }

  }


  removeImage(index: number) {

    URL.revokeObjectURL(this.selectedImages[index].preview)

    this.selectedImages.splice(index, 1);
  }

  createAd(){

    if (!this.title || !this.price || !this.location || !this.categoryId){
      return;
    }

    this.loading = true;

    const formData = new FormData();

    formData.append('title', this.title);
    formData.append('description', this.description);
    formData.append('price', this.price.toString());
    formData.append('location', this.location);
    formData.append('categoryId', this.categoryId.toString());

    for (const image of this.selectedImages){
      formData.append('images', image.file);
    }

    this.adsService.createAd(formData).subscribe({
      next: (ad) =>{
        this.router.navigate(['/ads', ad.id]);
      },
      error: (err)=>{
        console.error(err)
        this.loading = false;
      }
    });
  }





}
