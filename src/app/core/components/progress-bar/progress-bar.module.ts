import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProgressBarComponent } from './progress-bar.component';

@NgModule({
  declarations: [ProgressBarComponent],
  exports: [ProgressBarComponent],
  bootstrap: [ProgressBarComponent],
  imports: [CommonModule, NgbModule],
})
export class ProgressBarModule {}
