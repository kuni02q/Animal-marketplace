import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdDetails } from './ad-details.component';

describe('AdDetails', () => {
  let component: AdDetails;
  let fixture: ComponentFixture<AdDetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdDetails],
    }).compileComponents();

    fixture = TestBed.createComponent(AdDetails);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
