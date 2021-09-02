import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { PadComponent } from './components/pad/pad.component';
import { HeaderComponent } from './components/header/header.component';
import { PadsComponent } from './components/pads/pads.component';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    PadComponent,
    HeaderComponent,
    PadsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
