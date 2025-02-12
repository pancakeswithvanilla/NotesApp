import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogpgComponent } from './logpg.component';

describe('LogpgComponent', () => {
  let component: LogpgComponent;
  let fixture: ComponentFixture<LogpgComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LogpgComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogpgComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
