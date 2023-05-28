import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizatorProfileComponent } from './organizator-profile.component';

describe('OrganizatorProfileComponent', () => {
  let component: OrganizatorProfileComponent;
  let fixture: ComponentFixture<OrganizatorProfileComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrganizatorProfileComponent]
    });
    fixture = TestBed.createComponent(OrganizatorProfileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
