import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimerComponent } from './timer.component';
import {NgbDropdownModule} from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [TimerComponent],
    imports: [
        CommonModule,
        NgbDropdownModule
    ],
  exports: [TimerComponent]
})
export class TimerModule { }
