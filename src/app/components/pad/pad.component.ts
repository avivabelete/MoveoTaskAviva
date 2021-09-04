import { state } from '@angular/animations';
import { Component, OnInit, Input, ViewChild, ElementRef, Output, EventEmitter } from '@angular/core';
import { timer } from 'rxjs';
import { Activity } from 'src/app/activity';
import { LogService } from 'src/app/log.service';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-pad',
  templateUrl: './pad.component.html',
  styleUrls: ['./pad.component.css']
})
export class PadComponent implements OnInit {

  
  @ViewChild('myplayer') playerRef: ElementRef;
  player: any;
  padState: boolean;

  //Getting data from parent
  @Input() loopLink="";
  @Input() currentTime: () => number;
  @Input() isPadsPlay: boolean;
  @Input() isRecording: boolean;
  @Input() timestamp : number;
  
  constructor(private logSrv: LogService) {
   }

  ngOnInit() {
    //Pad start with ON state
    this.padState = true;
    this.player = this.playerRef.nativeElement;
  }

  onStateChange(){
    this.padState ? this.onStateOff() : this.onStateOn()
  }
  onStateOff(){
    
    //For Recording
    const temp = Date.now();
    const act: Activity = {id: uuid(), item: this.loopLink, action: 'off', time: temp-this.timestamp};
    this.timestamp = temp;
    this.isRecording ? this.logSrv.addActivity(act).subscribe():"";

    //Stop the player
    this.stop();
    this.player.load();
    this.player.controls = false;
    this.padState = false;
  }
  onStateOn(){
    //For recording
    const time = this.currentTime();
    const temp = Date.now();
    const act: Activity = {id: uuid(), item: this.loopLink, action: 'on', time: temp - this.timestamp};
    this.timestamp = temp;
    this.isRecording ? this.logSrv.addActivity(act).subscribe():"";

    //Play the player in the next loop
    this.playAfter(time);
  }
  playAfter(time){

    this.padState = true;
    //Check how much time to wait to the next loop
    timer((time == 0 ? 0: this.player.duration - time)*1000)
    .subscribe(()=> {
      this.padState = true;
      this.player.controls = true;
      if(this.isPadsPlay){
        this.player.load();
        this.play();
      }
    })
  }
  stop(){
    this.player.pause();
    this.player.load();
  }
  play(){
    this.player.load();
    this.player.play();
  }
}
