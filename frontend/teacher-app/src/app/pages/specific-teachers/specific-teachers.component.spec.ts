import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecificTeachersComponent } from './specific-teachers.component';

describe('SpecificTeachersComponent', () => {
  let component: SpecificTeachersComponent;
  let fixture: ComponentFixture<SpecificTeachersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecificTeachersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SpecificTeachersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
