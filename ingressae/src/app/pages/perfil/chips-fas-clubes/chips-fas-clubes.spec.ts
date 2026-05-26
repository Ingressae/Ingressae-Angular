import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ChipsFasClubes } from './chips-fas-clubes';

describe('ChipsFasClubes', () => {
  let component: ChipsFasClubes;
  let fixture: ComponentFixture<ChipsFasClubes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ChipsFasClubes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ChipsFasClubes);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
