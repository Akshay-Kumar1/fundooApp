import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
    it('Form should be valid '),async(()=>{
    expect(component.user.email.toEqual('akshay@gmail.com'));
    expect(component.user.password.toEqual('akshay'));
    expect(component.user.email).toBeTruthy();
    expect(component.user.password).toBeTruthy();
    })

    it('Invalid Form'),async(()=>{
      expect(component.user.email.toEqual(''));
      expect(component.user.password.toEqual(''));
      expect(component.user.email).toBeFalsy();
      expect(component.user.password).toBeFalsy();
      })
});
