import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotoesExportacaoComponent } from './botoes-exportacao.component';

describe('BotoesExportacaoComponent', () => {
  let component: BotoesExportacaoComponent;
  let fixture: ComponentFixture<BotoesExportacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotoesExportacaoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotoesExportacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
