import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CabecalhoPerfil } from './cabecalho-perfil';

describe('CabecalhoPerfil', () => {
  let component: CabecalhoPerfil;
  let fixture: ComponentFixture<CabecalhoPerfil>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CabecalhoPerfil]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CabecalhoPerfil);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
