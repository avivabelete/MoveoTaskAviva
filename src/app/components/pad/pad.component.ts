import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent implements OnInit {

  @ViewChild('myplayer') playerRef: ElementRef;
  @Input() loopLink="";
  padState: boolean = true;
  constructor() { }

  ngOnInit() {
    this.padState = true;
    this.playerRef.nativeElement.play();
  }
  onClick(){
    this.padState = !this.padState;
    this.playerRef.nativeElement.pause();
    this.playerRef.nativeElement.load();
    if(this.padState){
    this.playerRef.nativeElement.play();
    }
  }
  stopAll(){
    this.playerRef.nativeElement.stop();
  }
  playAll(){
    this.playerRef.nativeElement.play()
  }

}
