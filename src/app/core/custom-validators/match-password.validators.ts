import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export const matchPasswordValidator: ValidatorFn = (
  control: AbstractControl,
): ValidationErrors | null => {
  const password = control.get('password');
  const passwordConfirm = control.get('passwordConfirm');

  if (password && passwordConfirm && password.value === passwordConfirm.value) {
    return null;
  } else {
    return { passwordDontMatch: true }
  }
}

