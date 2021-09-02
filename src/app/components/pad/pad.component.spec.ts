import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PadComponent } from './pad.component';

describe('PadComponent', () => {
  let component: PadComponent;
  let fixture: ComponentFixture<PadComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PadComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should pause current player', () => {
    const player = component.playerRef;
    component.pause();
    expect(component.playerRef.nativeElement.paused).toBeTruthy();
  });
  it('should play current player', () => {
    const player = component.playerRef;
    component.play();
    expect(component.playerRef.nativeElement.paused).toBeFalsy();
  });
});
