import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardShow } from './card-show';

describe('CardShow', () => {
  let component: CardShow;
  let fixture: ComponentFixture<CardShow>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardShow]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardShow);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
