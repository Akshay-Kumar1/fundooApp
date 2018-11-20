import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SavenotesComponent } from './savenotes.component';

describe('SavenotesComponent', () => {
  let component: SavenotesComponent;
  let fixture: ComponentFixture<SavenotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SavenotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SavenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
