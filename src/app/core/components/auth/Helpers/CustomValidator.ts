

import { AbstractControl, Validators } from '@angular/forms';
var passwordValidator = require('password-validator');
declare var require: any
export class CustomValidators extends Validators {


    static lowercaseRequired(control: AbstractControl): { [key: string]: any } | null {

        var schema = new passwordValidator();
        schema.has().lowercase(1);

        if (!schema.validate(control.value)) {
            return { 'lowercaserequired': true };
        }
        return null;
    }

    static uppercaseRequired(control: AbstractControl): { [key: string]: any } | null {

        var schema = new passwordValidator();
        schema.has().uppercase(1);

        if (!schema.validate(control.value)) {
            return { 'uppercaserequired': true };
        }
        return null;
    }

    static numberRequired(control: AbstractControl): { [key: string]: any } | null {

        var schema = new passwordValidator();
        schema.has().digits(1);

        if (!schema.validate(control.value)) {
            return { 'numberrequired': true };
        }
        return null;
    }

    static specialCharacterRequired(control: AbstractControl): { [key: string]: any } | null {

        var schema = new passwordValidator();
        schema.has().symbols(1);

        if (!schema.validate(control.value)) {
            return { 'specialrequired': true };
        }
        return null;
    }

    static passwordMatchValidator(control: AbstractControl) {
        const password: string = control.get('Password')?.value; // get password from our password form control
        const confirmPassword: string = control.get('ConfirmPassword')?.value; // get password from our confirmPassword form control
        // compare is the password math
        if (password !== confirmPassword) {
            // if they don't match, set an error in our confirmPassword form control
            control.get('ConfirmPassword')?.setErrors({ NoPassswordMatch: true });
        }
    }

}

