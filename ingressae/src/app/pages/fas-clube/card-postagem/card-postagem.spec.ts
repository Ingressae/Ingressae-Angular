import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPostagem } from './card-postagem';

describe('CardPostagem', () => {
  let component: CardPostagem;
  let fixture: ComponentFixture<CardPostagem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CardPostagem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CardPostagem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
