import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchivesubComponent } from './archivesub.component';

describe('ArchivesubComponent', () => {
  let component: ArchivesubComponent;
  let fixture: ComponentFixture<ArchivesubComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchivesubComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchivesubComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
