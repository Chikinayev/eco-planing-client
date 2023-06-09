import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VoluntersListComponent } from './volunters-list.component';

describe('VoluntersListComponent', () => {
  let component: VoluntersListComponent;
  let fixture: ComponentFixture<VoluntersListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [VoluntersListComponent]
    });
    fixture = TestBed.createComponent(VoluntersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
