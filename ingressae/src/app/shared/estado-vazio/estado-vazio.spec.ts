import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoVazio } from './estado-vazio';

describe('EstadoVazio', () => {
  let component: EstadoVazio;
  let fixture: ComponentFixture<EstadoVazio>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EstadoVazio]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstadoVazio);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
