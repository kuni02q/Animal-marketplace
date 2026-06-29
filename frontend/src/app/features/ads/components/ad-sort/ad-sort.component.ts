import {Component, EventEmitter, Output} from '@angular/core';
import {FormsModule} from '@angular/forms';

@Component({
  selector: 'app-ad-sort',
  standalone: true,
  imports: [
    FormsModule
  ],
  templateUrl: './ad-sort.component.html',
  styleUrl: './ad-sort.component.css',
})
export class AdSortComponent {

  @Output() sortChange = new EventEmitter<string>();

  selected = 'createdAt,desc';

  options = [
    { label: 'Legújabbak', value: 'createdAt,desc' },
    { label: 'Legrégebbiek', value: 'createdAt,asc' },
    { label: 'Ár ↑', value: 'price,asc' },
    { label: 'Ár ↓', value: 'price,desc' },
  ];

  onChange() {
    this.sortChange.emit(this.selected);
  }

}
