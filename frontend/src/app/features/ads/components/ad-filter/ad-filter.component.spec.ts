import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdFilterComponent } from './ad-filter.component';

describe('AdFilterComponent', () => {
  let component: AdFilterComponent;
  let fixture: ComponentFixture<AdFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdFilterComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AdFilterComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
