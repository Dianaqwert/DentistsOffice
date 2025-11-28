import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TratamientoPacientesComponent } from './tratamiento-pacientes.component';

describe('TratamientoPacientesComponent', () => {
  let component: TratamientoPacientesComponent;
  let fixture: ComponentFixture<TratamientoPacientesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TratamientoPacientesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TratamientoPacientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
