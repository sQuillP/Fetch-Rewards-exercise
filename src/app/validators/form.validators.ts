import { AbstractControl, FormControl, ValidationErrors } from "@angular/forms";



export function validatePassword(control:AbstractControl): ValidationErrors | null  {
    if(
        !/[A-Z]/g.test(control.value)||
        !/[^A-Za-z0-9]/g.test(control.value)||
        !/[0-9]/gi.test(control.value)
    )
    return {invalidPasswordFormat:true};
    return null;
}