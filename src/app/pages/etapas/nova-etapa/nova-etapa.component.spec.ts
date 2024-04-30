import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovaEtapaComponent } from './nova-etapa.component';

describe('NovaEtapaComponent', () => {
  let component: NovaEtapaComponent;
  let fixture: ComponentFixture<NovaEtapaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovaEtapaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NovaEtapaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
