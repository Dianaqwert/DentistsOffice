import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdministracionDentistaComponent } from './administracion-dentista.component';

describe('AdministracionDentistaComponent', () => {
  let component: AdministracionDentistaComponent;
  let fixture: ComponentFixture<AdministracionDentistaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdministracionDentistaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdministracionDentistaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
