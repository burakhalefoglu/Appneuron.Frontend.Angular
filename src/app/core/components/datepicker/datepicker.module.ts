import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DatepickerComponent} from '../datepicker/datepicker.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { DateTimePickerModule} from 'ngx-datetime-picker';

@NgModule({
    declarations: [
        DatepickerComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        DateTimePickerModule
    ],
    exports: [
        DatepickerComponent
    ],
    providers: []
})
export class DatepickerModule {
}
