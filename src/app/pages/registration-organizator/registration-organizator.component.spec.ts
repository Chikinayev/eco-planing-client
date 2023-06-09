import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationOrganizatorComponent } from './registration-organizator.component';

describe('RegistrationOrganizatorComponent', () => {
  let component: RegistrationOrganizatorComponent;
  let fixture: ComponentFixture<RegistrationOrganizatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RegistrationOrganizatorComponent]
    });
    fixture = TestBed.createComponent(RegistrationOrganizatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
