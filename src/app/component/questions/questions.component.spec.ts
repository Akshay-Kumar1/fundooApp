import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuestionsComponent } from './questions.component';

describe('QandAComponent', () => {
  let component: QuestionsComponent;
  let fixture: ComponentFixture<QuestionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    let likeArray=[{
      like:Boolean,
      userId:"user99"
    }]
    let ques={
      like: likeArray
    }
    expect(component.like(ques)).toBeTruthy();
  });

  it('#like() should count', () => {
    let likeArray = [{
      like: Boolean,
      userId: localStorage.getItem('id')
    }]
    let ques = {
      like: likeArray
    }
    expect(component.like).toBe(0, 'zero');
    component.like(ques);
    expect(component.like).toBeGreaterThanOrEqual(0, 'Onclick');
  
  });


  it('should create', () => {

let body={
  "message": "dfgd",
  "notesId": String
}
    expect(component.askFirstQuestion()).toBeTruthy();
  body = {
    "message": "",
    "notesId": String
  }
    expect(component.askFirstQuestion()).toBeFalsy();

  });

  it('should create', () => {
   
    let ques = {
      id: "koollfsa"
    }
    expect(component.leaveReply(ques)).toBeTruthy();
  
    ques = {
      id: ""
    }
    expect(component.leaveReply(ques)).toBeFalsy();
  });

});