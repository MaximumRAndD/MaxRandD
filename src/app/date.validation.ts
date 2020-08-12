import {FormGroup, ValidatorFn} from '@angular/forms';

// http://www.carbonrider.com/2020/01/30/build-angular-custom-validation-function/
// https://www.youtube.com/watch?v=REbXP2OiGn8

export function dataLessThan(startDateField: string, endDateField: string): ValidatorFn
{
  return (form: FormGroup): { [key: string]: boolean } | null =>
  {
    const startDateValue = form.get(startDateField).value;
    const endDateValue = form.get(endDateField).value;

    if (!startDateValue || !endDateValue)
    {
      return {missing: true};
    }

    const startDate = new Date(startDateValue);
    const endDate = new Date(endDateValue);

    if (startDate.getTime() >= endDate.getTime())
    {
      const err = {dateLessThan: true};
      form.get(endDateField).setErrors(err);
      return err;
    }
    else
    {
      const datelessError = form.get(endDateField).hasError('dateLessThan');
      if (datelessError)
      {
        delete form.get(endDateField).errors['dateLessThan'];
        form.get(endDateField).updateValueAndValidity();
      }
    }
  };
}

export function endDateMoreThanYear(startDateField: string, endDateField: string): ValidatorFn
{
  return (form: FormGroup): { [key: string]: boolean } | null =>
  {
    const startDateValue = form.get(startDateField).value;
    const endDateValue = form.get(endDateField).value;

    if (!startDateValue || !endDateValue)
    {
      return {missing: true};
    }

    const startDate = new Date(startDateValue);
    const startDatePlusYear = new Date (startDate.getFullYear() + 1, startDate.getMonth(), startDate.getDate());
    const endDate = new Date(endDateValue);

    if (endDate.getTime() > startDatePlusYear.getTime())
    {
      const err = {endDateMoreThanYear: true};
      form.get(endDateField).setErrors(err);
      return err;
    }
    else
    {
      const datelessError = form.get(endDateField).hasError('endDateMoreThanYear');
      if (datelessError)
      {
        delete form.get(endDateField).errors['endDateMoreThanYear'];
        form.get(endDateField).updateValueAndValidity();
      }
    }
  };
}
