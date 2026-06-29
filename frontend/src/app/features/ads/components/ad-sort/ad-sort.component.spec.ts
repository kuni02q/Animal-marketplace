import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdSortComponent } from './ad-sort.component';

describe('AdSortComponent', () => {
  let component: AdSortComponent;
  let fixture: ComponentFixture<AdSortComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdSortComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdSortComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
