import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavigationListComponentComponent } from './navigation-list-component.component';

describe('NavigationListComponentComponent', () => {
  let component: NavigationListComponentComponent;
  let fixture: ComponentFixture<NavigationListComponentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NavigationListComponentComponent]
    });
    fixture = TestBed.createComponent(NavigationListComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
