import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SignupComponent } from './signup.component';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  it('Form should be valid '),async(()=>{
    expect(component.user.email.toEqual('akshay@gmail.com'));
    expect(component.user.email).toBeTruthy();
    expect(component.user.password.toEqual('akshay'));
    expect(component.user.password).toBeTruthy();
    expect(component.user.firstName.toEqual('aks'));
    expect(component.user.firstName).toBeTruthy();
    expect(component.user.lastName.toEqual('kum'));
    expect(component.user.lastName).toBeTruthy();
    expect(component.user.service.toEqual('basic'));
    expect(component.user.service).toBeTruthy();
    })

    it('Form is Invalid'),async(()=>{
      expect(component.user.email.toEqual(''));
      expect(component.user.email).toBeFalsy();
      expect(component.user.password.toEqual(''));
      expect(component.user.password).toBeFalsy();
      expect(component.user.firstName.toEqual(''));
      expect(component.user.firstName).toBeFalsy();
      expect(component.user.lastName.toEqual(''));
      expect(component.user.lastName).toBeFalsy();
      expect(component.user.service.toEqual(''));
      expect(component.user.service).toBeFalsy();
      })

});
