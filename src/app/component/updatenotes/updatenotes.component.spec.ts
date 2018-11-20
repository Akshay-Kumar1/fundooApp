import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatenotesComponent } from './updatenotes.component';

describe('UpdatenotesComponent', () => {
  let component: UpdatenotesComponent;
  let fixture: ComponentFixture<UpdatenotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatenotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatenotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
