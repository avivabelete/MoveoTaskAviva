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
  @Input() loopLink="";
  @Input() currentTime: () => number;
  @Input() isPadsPlay: boolean;
  @Input() isRecording: boolean;
  padState: boolean = true;
  constructor(private logSrv: LogService) { }

  ngOnInit() {
    this.padState = true;
    this.player = this.playerRef.nativeElement;
  }

  //change the pad's state(on/off)
  onClickOnOff(){
    // OFF
    if(this.padState){
      const act: Activity = {id: uuid(), item: this.loopLink, action: 'off'};
      this.isRecording ? this.logSrv.addActivity(act).subscribe():"";
      this.pause();
      this.player.load();
      this.player.controls = false;
    } else {
    //ON
      const time = this.currentTime();
      const act: Activity = {id: uuid(), item: this.loopLink, action: 'on', time: time};
      this.isRecording ? this.logSrv.addActivity(act).subscribe():"";
      // if(this.isPadsPlay){//check
      timer((time == 0 ? 0: this.player.duration - time)*1000)
      .subscribe(()=> {
        this.player.controls = true;
        if(this.isPadsPlay){
          this.play();
        }
      })
    // }
    }
    //change the state
    this.padState = !this.padState;
  }
  pause(){
    // const act: Activity = {id: uuid(), item: this.loopLink, action: 'stop'};
    // this.isRecording ? this.logSrv.addActivity(act)
    // .subscribe(data => console.log(data)):"";
    this.player.pause();
  }
  play(){
    // const act: Activity = {id: uuid(), item: this.loopLink, action: 'play'};
    // this.isRecording ? this.logSrv.addActivity(act)
    // .subscribe(data => console.log(data)):"";
    this.player.play();
  }
}
