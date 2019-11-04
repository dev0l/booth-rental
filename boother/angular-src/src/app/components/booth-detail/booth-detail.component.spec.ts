import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BoothDetailComponent } from './booth-detail.component';

describe('BoothDetailComponent', () => {
  let component: BoothDetailComponent;
  let fixture: ComponentFixture<BoothDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BoothDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BoothDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
