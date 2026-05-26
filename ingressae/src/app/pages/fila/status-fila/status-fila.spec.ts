import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatusFila } from './status-fila';

describe('StatusFila', () => {
  let component: StatusFila;
  let fixture: ComponentFixture<StatusFila>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StatusFila]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatusFila);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
