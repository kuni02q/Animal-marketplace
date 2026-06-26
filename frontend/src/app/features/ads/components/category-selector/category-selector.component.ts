import {Component, EventEmitter, HostListener, Input, OnInit, Output} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Category} from '../../models/category.model';
import {CategoryService} from '../../../../core/services/category.service';

interface FlatCategory {
  id: number;
  name: string;
  parentName: string;
  childName: string;
}

@Component({
  selector: 'app-category-selector',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './category-selector.component.html',
  styleUrl: './category-selector.component.css',
})
export class CategorySelectorComponent implements OnInit {

  @Input() selectedCategoryId: number | null = null;

  @Output() selectedCategoryIdChange = new EventEmitter<number | null>();

  categories: Category[] = [];
  flatCategories: FlatCategory[] = [];
  filteredCategories: FlatCategory[] = [];
  search = '';
  dropdownOpen = false;

  constructor(private categoryService: CategoryService) {}

  ngOnInit() {
    this.loadCategories();
  }

  loadCategories() {

    this.categoryService.getAll().subscribe({
      next: data => {
        this.categories = data;
        this.flatCategories= [];

        for (const parent of data){
          for (const sub of parent.subcategories){

            this.flatCategories.push({
              id: sub.id,
              name: `${parent.name} > ${sub.name}`,
              parentName: parent.name,
              childName: sub.name
            });
          }
        }
        this.filteredCategories = this.flatCategories;

      }
    });

  }

  filterCategories(){
    const value = this.search.toLowerCase();

    this.filteredCategories = this.flatCategories.filter(c =>
      c.name.toLowerCase().includes(value))
  }

  selectCategory(category: FlatCategory){
    this.selectedCategoryId = category.id;
    this.search = category.name;
    this.dropdownOpen = false;
    this.selectedCategoryIdChange.emit(this.selectedCategoryId);
  }

  openDropdown(){
    this.dropdownOpen = true;
  }

  @HostListener('document:click')
  closeDropdown(){
    this.dropdownOpen = false;
  }

  stopPropagation(event: MouseEvent){
    event.stopPropagation();
  }










}
