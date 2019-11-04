import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BootherComponent } from './boother.component';

describe('BootherComponent', () => {
  let component: BootherComponent;
  let fixture: ComponentFixture<BootherComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BootherComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BootherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
