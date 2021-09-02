import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent implements OnInit {

  @ViewChild('myplayer') playerRef: ElementRef;
  @Input() loopLink="";
  @Input() currentTime: () => number;
  @Input() isPadsPlay: boolean;
  padState: boolean = true;
  constructor() { }

  ngOnInit() {
    this.padState = true;
  }

  //change the pad's state(on/off)
  onClickOnOff(){
    localStorage.setItem(this.loopLink, this.padState ? 'off':'on')
    if(this.padState){
      this.pause();
      this.playerRef.nativeElement.load();
      this.playerRef.nativeElement.controls = false;
    } else {
      const time = this.currentTime();
      timer((time == 0 ? 0: this.playerRef.nativeElement.duration - time)*1000).subscribe(()=> {
        this.playerRef.nativeElement.controls = true;
        if(this.isPadsPlay){
          this.play();
        }
      })
    }
    //change the state
    this.padState = !this.padState;
  }
  pause(){
    if(this.padState)
         this.playerRef.nativeElement.pause();
  }
  play(){
    if(this.padState)
         this.playerRef.nativeElement.play();
  }
}
