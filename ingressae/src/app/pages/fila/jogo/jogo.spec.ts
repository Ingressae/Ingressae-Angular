import { ComponentFixture, TestBed } from '@angular/core/testing';

import * as jogo from './jogo';

describe('Jogo', () => {
  let component: any;
  let fixture: ComponentFixture<any>;

  beforeEach(async () => {
    const Comp: any = (jogo as any).Jogo || (jogo as any).JogoComponent || (jogo as any).default;

    await TestBed.configureTestingModule({
      declarations: [Comp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Comp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
