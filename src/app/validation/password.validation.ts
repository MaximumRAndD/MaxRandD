import {FormGroup, ValidatorFn} from '@angular/forms';

export function passwordMatch(password1: string, password2: string): ValidatorFn
{
  return (form: FormGroup): { [key: string]: boolean } | null =>
  {
    const password1Value = form.get(password1).value;
    const password2Value = form.get(password2).value;

    if (!password1 || !password2)
    {
      return {missing: true};
    }

    if (password1Value !== password2Value)
    {
      const err = {passDontMatch: true};
      form.get(password2).setErrors(err);
      return err;
    }
    else
    {
      const datelessError = form.get(password2).hasError('passDontMatch');
      if (datelessError)
      {
        delete form.get(password2).errors['passDontMatch'];
        form.get(password2).updateValueAndValidity();
      }
    }
  };
}
