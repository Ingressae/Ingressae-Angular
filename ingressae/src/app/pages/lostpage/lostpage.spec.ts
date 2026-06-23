import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Lostpage } from './lostpage';

describe('Lostpage', () => {
  let component: Lostpage;
  let fixture: ComponentFixture<Lostpage>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Lostpage]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Lostpage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
