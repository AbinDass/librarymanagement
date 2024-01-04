import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlltransactionComponent } from './alltransaction.component';

describe('AlltransactionComponent', () => {
  let component: AlltransactionComponent;
  let fixture: ComponentFixture<AlltransactionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AlltransactionComponent]
    });
    fixture = TestBed.createComponent(AlltransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
