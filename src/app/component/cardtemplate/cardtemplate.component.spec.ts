import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardtemplateComponent } from './cardtemplate.component';

describe('CardtemplateComponent', () => {
  let component: CardtemplateComponent;
  let fixture: ComponentFixture<CardtemplateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardtemplateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardtemplateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
