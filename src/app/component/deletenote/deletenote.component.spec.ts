import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DeletenoteComponent } from './deletenote.component';

describe('DeletenoteComponent', () => {
  let component: DeletenoteComponent;
  let fixture: ComponentFixture<DeletenoteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DeletenoteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DeletenoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
