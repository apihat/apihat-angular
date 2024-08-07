import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApihatAngularComponent } from './apihat-angular.component';

describe('ApihatAngularComponent', () => {
  let component: ApihatAngularComponent;
  let fixture: ComponentFixture<ApihatAngularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApihatAngularComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApihatAngularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
