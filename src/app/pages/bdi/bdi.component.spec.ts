import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BdiComponent } from './bdi.component';

describe('BdiComponent', () => {
  let component: BdiComponent;
  let fixture: ComponentFixture<BdiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BdiComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BdiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
