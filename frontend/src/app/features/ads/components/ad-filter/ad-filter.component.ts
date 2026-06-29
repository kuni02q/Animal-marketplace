import {Component, EventEmitter, Input, Output, SimpleChanges} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {CategorySelectorComponent} from '../category-selector/category-selector.component';
import {AdFilter} from '../../models/ad-filter.model';

@Component({
  selector: 'app-ad-filter',
  standalone: true,
  imports: [CommonModule, FormsModule, CategorySelectorComponent],
  templateUrl: './ad-filter.component.html',
  styleUrl: './ad-filter.component.css',
})
export class AdFilterComponent {

  @Input() filter!: AdFilter;
  @Output() filterChange = new EventEmitter<AdFilter>();

  apply(){
    this.filterChange.emit({...this.filter});
  }

  reset(){
    this.filter = {
      categoryId: null,
      country: '',
      city: '',
      minPrice: null,
      maxPrice: null,
      gender: null,

      vaccinated: null,
      chipped: null,
      neutered: null,

      searchText: ''
    };

    this.filterChange.emit({...this.filter});
  }

  onVaccinatedChange(value: boolean | null) {
    this.filter.vaccinated = value;
  }

  onChippedChange(value: boolean | null) {
    this.filter.chipped = value;
  }

  onNeuteredChange(value: boolean | null) {
    this.filter.neutered = value;
  }

  syncFromParent() {
    this.filter = {
      ...this.filter
    };
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['filter'] && this.filter) {
      this.syncFromParent();
    }
  }

}
