/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { PictureCardComponent } from './picture-card.component';

describe('PictureCardComponent', () => {
  let component: PictureCardComponent;
  let fixture: ComponentFixture<PictureCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PictureCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PictureCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
