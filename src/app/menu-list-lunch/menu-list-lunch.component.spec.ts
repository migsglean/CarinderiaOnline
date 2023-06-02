import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuListLunchComponent } from './menu-list-lunch.component';

describe('MenuListLunchComponent', () => {
  let component: MenuListLunchComponent;
  let fixture: ComponentFixture<MenuListLunchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MenuListLunchComponent]
    });
    fixture = TestBed.createComponent(MenuListLunchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
