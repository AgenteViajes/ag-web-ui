import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SummaryRoomComponent } from './summary-room.component';

describe('SummaryRoomComponent', () => {
  let component: SummaryRoomComponent;
  let fixture: ComponentFixture<SummaryRoomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SummaryRoomComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SummaryRoomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
